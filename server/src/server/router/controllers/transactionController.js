const config = require('../../utils/consts');
const dateSet = require('../../utils/dateSet');
const db = require('../../models/index');
const { ApplicationError,
        UnauthorizedError,
        UserNotFoundError, BankError} = require('../../utils/customErrrors/errors');



const payment = async (sender, receiver, t) => {
    try {
        await db.BankAccounts.update({ balance: db.sequelize.literal('balance -' + config.PRIZE_POOL) },
            { where: {card_number: sender}, transaction: t});
        await db.BankAccounts.update({ balance: db.sequelize.literal('balance +' + config.PRIZE_POOL) },
            { where: {card_number: receiver}, transaction: t });
    } catch(e) {
        throw new BankError();
    }
};


module.exports.createContests = async (req, res, next) => {
    let t;
    try {
        t = await db.sequelize.transaction();
        await payment(req.body.cardNumber, config.BANK_ACCOUNT_CARD, t);
        const contests = await db.Contests.bulkCreate(req.contests, {returning: true, transaction: t});
        console.log('contests', contests);

        if (!contests[0]) {
            throw new BankError('Failed operation');
        }
        await t.commit();
        res.status(200).send({results:contests, status:"success"})
    } catch(e) {
        await t.rollback();
        next(e);
    }

};
