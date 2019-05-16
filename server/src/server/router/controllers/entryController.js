const dateSet = require('../../utils/dateSet');
const db = require('../../models/index');
const {emailSender} = require('../../utils/emailSender');

const { ApplicationError,
        UnauthorizedError,
        UserNotFoundError } = require('../../utils/customErrrors/errors');
const { ENTRY_REJECTED, ENTRY_WINNER, ENTRY_CONFIRMED, TAGLINE_TYPE, LOGO_TYPE } = require('../../utils/consts');
const { controller }  = require('../../router/controllers/socketController');


module.exports.changeStatusSuggestion =  async (req, res, next) => {
    const { id, user_id, action, email } = req.body;
    console.log(id, user_id, action, email);
    const entryId=id;
    try {
        const entry = await db.Suggestions.update({ moderation_status: action },
          { where: { id:entryId }, returning: true });
        if (entry[0]<1) {
            throw new ApplicationError('Entry not found');
        }
        const {id, answer, contest_id}= entry[1][0].dataValues;
        controller.emitEntryReviewResult({ entryCreator:user_id, status:action, answer });
        if (action===ENTRY_CONFIRMED) {
            const contest = await db.Contests.findOne({id:contest_id});
            const contestCreator = contest.creator_id;
            controller.emitEntryCreated({ contest_id, contestCreator })
        }
        emailSender(email, action);
        res.status(200).send({ id, status:action });
    } catch (e) {
        console.log(e);
        next(new ApplicationError('Entry not found'));
    }
};

module.exports.listEntries =  async (req, res , next) => {
    try {
        const entries = await db.Suggestions.findAll({
            order: [["moderation_status","DESC"]],
            include: [{
                model: db.Users,
                attributes: ['full_name', 'profile_picture', 'email', 'id'],
            }],
          },
        );
        res.status(200).send(entries);
    } catch (e) {
        console.log(e)
        next(new ApplicationError('Internal error'));
    }
};

module.exports.createSuggestion = async(req, res, next) => {
    const entry = JSON.parse(req.body.entry);
    const { user_id, contest_id, answer, contestCreator } = entry;
    let file;
    if(req.files['entryFile']){
        file = req.files['entryFile'][0].filename;
    } else {
        file = '';
    }
    try {
        const entry = await db.Suggestions.create({
            user_id,
            contest_id,
            answer,
            file,
        });
        if (!entry) {
            throw new ApplicationError();
        }
        let resultedEntry = await db.Suggestions.findOne({
            where: {
                id: entry.id,
            },
            include: [{
                model: db.Users,
                attributes: ['full_name', 'profile_picture', 'email', 'id'],
            }],
            order: [["created_at","DESC"]],
        });
        resultedEntry = resultedEntry.dataValues;
        res.send(resultedEntry);
    }
    catch (e) {
        next(e);
        next(new ApplicationError('Failed creating entry'));
    }
};

module.exports.rejectSuggestion =  async (req, res, next) => {
    const { id, contestId, customerId } = req.body;
    try {
        const entry = await db.Suggestions.update({ status: ENTRY_REJECTED },
            { where: { id }, returning: true });
        if (entry[0]<1) {
            throw new ApplicationError('Entry not found');
        }
        const updatedId= entry[1][0].dataValues.id;
        res.status(200).send({ id: updatedId });
    } catch (e) {
        next(new ApplicationError('Entry not found'));
    }
};

module.exports.setWinnerSuggestion =  async (req, res, next) => {
    const { customerId, contestId, entryId, creatorId } = req.body;
    let t;
    let endedContest;
    try {
        t = await db.sequelize.transaction();

        const entry = await db.Suggestions.update({ status: ENTRY_WINNER },
            { where: { id: entryId }, returning: true, transaction:t });

        if (entry[0]<1) {
            throw new ApplicationError('Entry not found');
        }

        const op =db.Sequelize.Op;
        await db.Suggestions.update({ status: ENTRY_REJECTED },
            { where: { contest_id: contestId, id: { [op.ne]: entryId } }, transaction:t });

        // Deactivating current contest
        endedContest = await db.Contests.update(
            { completed: true, is_active: false },
            { where: { id: contestId, creator_id: customerId, is_active: true },
                returning: true, transaction:t });

        if (endedContest[0]===0) {
            throw new ApplicationError('Transaction error');
        }
        endedContest = endedContest[1][0].dataValues;

        // Starting next contest in order
        if (endedContest.order_id) {
            const contests = await db.Contests.findAll(
      { where: { order_id: endedContest.order_id, completed: false, id: { [op.ne]: entryId } }, transaction:t });
            if (contests.length) {
                let nextContest = contests.filter(c =>  c.dataValues.type === TAGLINE_TYPE);
                if (nextContest.length<1) {
                    nextContest = contests.filter(c =>  c.dataValues.type === LOGO_TYPE);
                }
                const endDate = dateSet.addDays(nextContest[0].days_passed);
                db.Contests.update(
                    { is_active: true, end_date: endDate },
                    {
                        where: {
                            id: nextContest[0].id,
                            is_active: false,
                            completed: false,
                        },
                        transaction:t,
                    }
                );
            }
        }
        // Add prize money to user
        await db.Users.update(
            { account: db.sequelize.literal('account +' + endedContest.prize_pool)},
            { where: { id: creatorId }, transaction:t });

        const winnerId= entry[1][0].dataValues.id;
        await t.commit();
        controller.emitEntryWon({ creatorId, contestId });
        res.status(200).send({ id: winnerId });

    } catch (e) {
        console.log(e);
        await t.rollback();
        next(new ApplicationError('Transaction error'));
    }
};
