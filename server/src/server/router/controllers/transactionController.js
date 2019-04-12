const bcrypt = require('bcrypt');
const uuid = require('node-uuid');
const jwt = require('jsonwebtoken');
const config = require('../../utils/consts');
const dateSet = require('../../utils/dateSet');

const db = require('../../models/index');
const {UserAlreadyExistsError,
    WrongPasswordError,
    ApplicationError,
    UnauthorizedError,
    UserNotFoundError} = require('../../utils/customErrrors/errors');


module.exports.checkCreditCard=(req,res,next)=>{
    db.BankAccounts.findOne({where: {card_number: req.body.cardNumber}})
        .then(foundAccount=>{
            if (foundAccount.account < config.PRIZE_POOL) {
                next(new ApplicationError("not enough money on card"));
            }
            else{
                next();
            }
        })
        .catch(err=>{
            next(new ApplicationError(" Credit card not found"));
        })
};


module.exports.createContests = (req, res, next) => {
    // let insertContestPromises = req.contests.map(contest => {
    //     return db.Contests.create(contest)
    let insertContestPromises = db.Contests.bulkCreate(req.contests);

    db.sequelize.transaction(()=> {
        return Promise.all([
            db.BankAccounts.update(
                { account: db.sequelize.literal('account -' + config.PRIZE_POOL) },
                { where: {card_number: req.body.cardNumber }}                   //   1111222233334444
            ),
            db.BankAccounts.update(
                { account: db.sequelize.literal('account +' + config.PRIZE_POOL) },
                { where: {card_number: config.BANK_ACCOUNT_CARD}}
            ),
        ])
    })
    .then(()=>{
        return insertContestPromises;
    })
    .then(results=> {
        res.status(200).send({results:results, status:"success"})
    })
    .catch(err => {
        console.log(err);
        next(new ApplicationError(err))
    });
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
        console.log(entry);

        if (!entry) {
            next(new ApplicationError('Entry not found'));
        }

        const contest = await db.Contests.findOne({
            where: {
                id: entry[1][0].dataValues.contest_id
            }, include: [
                { model: db.Suggestions }
            ]
        });

        if (!contest) {
            next(new ApplicationError('Contest not found'))
        }

        res.status(200).send(contest);
    } catch (e) {
        next(e);
    }
};

module.exports.setWinnerSuggestion =  async (req, res , next) => {

    //console.log("User from token", req.decoded);

    const {customerId, contestId, entryId, creatorId} = req.body;

    console.log(creatorId, );


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
            }, include: [
                {model: db.Suggestions}
            ],
            transaction:t
        });

        await t.commit();
        res.status(200).send(updatedContest);

    } catch (e) {
        await t.rollback();
        next(e);
    }
};
