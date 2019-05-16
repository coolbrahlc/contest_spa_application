const config = require('../../utils/consts');
const dateSet = require('../../utils/dateSet');
const db = require('../../models/index');
const { ApplicationError, BankError, TransactionError } = require('../../utils/customErrrors/errors');


module.exports.createContests = async (req, res, next) => {
    let t;
    try {
        t = await db.sequelize.transaction();

        await db.BankAccounts.update({ account: db.sequelize.literal('account -' + config.PRIZE_POOL) },
            { where: { card_number: req.body.cardNumber }, transaction: t });

        const bankProfit = await db.BankAccounts.update({ account: db.sequelize.literal('account +' + config.PRIZE_POOL) },
            { where: { card_number: config.BANK_ACCOUNT_CARD }, transaction: t });
        if (bankProfit[0]===0) {
            return next(new TransactionError('bank account error'));
        }
        const contests = await db.Contests.bulkCreate(req.contests, {returning: true, transaction: t});

        if (!contests[0]) {
            throw new BankError('Failed operation');
        }
        await t.commit();
        res.status(200).send({ results:contests, status: 'success' });
    } catch(e) {
        await t.rollback();
        next(e);
    }

};
