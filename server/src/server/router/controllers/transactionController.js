const config = require('../../utils/consts');
const dateSet = require('../../utils/dateSet');
const db = require('../../models/index');
const { ApplicationError,
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
        next(new ApplicationError(err))
    });
};


