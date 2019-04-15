const dateSet = require('../../utils/dateSet');
const db = require('../../models/index');
const { ApplicationError,
        UnauthorizedError,
        UserNotFoundError} = require('../../utils/customErrrors/errors');

module.exports.createSuggestion = async(req,res,next) => {
    const entry = JSON.parse(req.body.entry);
    const {user_id, contest_id, answer} = entry;
    if(req.file){
        entry.file = req.file.filename;
    }
    try{
        const entry = await db.Suggestions.create({
            user_id,
            contest_id,
            answer
        });
        if (entry) {
            const contest = await db.Contests.findOne({
                where: {
                    id: contest_id
                },
                include: [{model: db.Users}, { model: db.Suggestions,
                    include: [{
                        model: db.Users,
                        attributes: ['full_name', 'profile_picture']
                    }]
                }]
            });
            res.send(contest);
        }
    }
    catch (e) {
        next(e);
    }
};

module.exports.rejectSuggestion =  async (req, res , next) => {

    const {id, contestId, customerId} = req.body;
    try {
        const checkIsOwner = await db.Contests.findOne({
            attributes: ['creator_id'],
            where: {
                id: contestId
            }
        });
        if (checkIsOwner.dataValues.creator_id!==customerId) {
            next(new ApplicationError('Permission denied'))
        }
        const entry = await db.Suggestions.update({
                status: "rejected"},
            {where: {id: id},
                returning: true
            });

        if (!entry) {
            next(new ApplicationError('Entry not found'));
        }

        const contest = await db.Contests.findOne({
            where: {
                id: entry[1][0].dataValues.contest_id
            },
            include: [{model: db.Users}, { model: db.Suggestions,
                include: [{
                    model: db.Users,
                    attributes: ['full_name', 'profile_picture']
                }]
            }]
        });

        if (!contest) {
            next(new ApplicationError('Contest not found'))
        }
        console.log('sending CONTESTS')
        console.log(contest)
        res.status(200).send(contest);
    } catch (e) {
        next(e);
    }
};

module.exports.setWinnerSuggestion =  async (req, res , next) => {

    const {customerId, contestId, entryId, creatorId} = req.body;
    let t;
    let endedContest;

    try {
        if (customerId !== req.decoded.id) {
            next(new ApplicationError('Permission denied'))
        }
        t = await db.sequelize.transaction();

        await db.Suggestions.update({status: "winner"},
            {where: {id: entryId}, returning: true, transaction:t} );

        const op =db.Sequelize.Op;
        await db.Suggestions.update({status: "rejected"},
            {where: {contest_id: contestId, id: {[op.ne]: entryId}}, transaction:t });

        // Deactivating current contest
        endedContest = await db.Contests.update(
            {completed: true, is_active: false},  // days_left: 0},
            {where: {id: contestId, creator_id: customerId},
                returning: true, transaction:t} );

        if (endedContest[0]===0) {
            next(new ApplicationError('Transaction error'))
        }
        endedContest = endedContest[1][0].dataValues;

        // Starting next contest in order
        if (endedContest.order_id) {
            const contests = await db.Contests.findAll(
                {where: {order_id: endedContest.order_id, completed: false}, transaction:t });
            if (contests.length) {
                const nextId =Math.min(...contests.map(c => {
                    return c.dataValues.id;
                }));
                const filtered = contests.filter( c => c.dataValues.id === nextId );
                const endDate = dateSet.addDays(filtered[0].days_passed);

                db.Contests.update(
                    {is_active: true, end_date: endDate},
                    {
                        where: {
                            id: nextId,
                            is_active: false,
                            completed: false,
                        },
                        transaction:t
                    }
                )
            }
        }
        // Add prize money to user
        await db.Users.update(
            {account: db.sequelize.literal('account +' + endedContest.prize_pool)},
            {where: {id: creatorId}, transaction:t});

        const updatedContest = await db.Contests.findOne({
            where: {
                id: endedContest.id
            },
            include: [{model: db.Users}, { model: db.Suggestions,
                include: [{
                    model: db.Users,
                    attributes: ['full_name', 'profile_picture']
                }]
            }],
            transaction:t
        });

        await t.commit();
        res.status(200).send(updatedContest);

    } catch (e) {
        await t.rollback();
        next(e);
    }
};
