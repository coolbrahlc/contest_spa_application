const config = require('../utils/consts');
const db = require('../models/index');
const { ApplicationError, BalanceError, BankError } = require('../utils/customErrrors/errors');


module.exports.checkCreditCard=(req, res, next)=>{
    db.BankAccounts.findOne({where: {card_number: req.body.cardNumber}})
        .then(foundAccount=>{
            if (foundAccount.account < config.PRIZE_POOL) {
                next(new BalanceError("Not enough money on card"));
            }
            else{
                next();
            }
        })
        .catch(err=>{
            next(new BankError("Credit card not found"));
        })
};
