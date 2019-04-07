const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../utils/consts');
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


module.exports.setActiveContest = (req, res, next) => {

    //next(new ApplicationError("some error", 500));
    console.log("files: ",req.files);

    const contestsBody = Object.assign({}, req.body);
    delete contestsBody['cardNumber'];

    let contests = [];
    Object.keys(contestsBody).forEach(key => {
        contests.push(JSON.parse(contestsBody[key]));
    });

    let prize_pool = parseInt(config.PRIZE_POOL/contests.length);

    contests.map((contest) =>{
        contest.creator_id = req.decoded.id;
        contest.updated_at = Date.now();
        contest.is_active = false;
        contest.prize_pool = prize_pool;

        let fileField = req.files[contest.type+'File'] ;  // adding file path
        if (fileField) {
            contest.file = fileField[0].filename;
        }
    });
    contests[0].is_active = true;
    req.contests= contests;
    next();
};


module.exports.createContests = (req, res, next) => {

    console.log(req.contests);
    let insertContestPromises = req.contests.map(contest => {
        return db.Contests.create(contest)
    });

    console.log(config.BANK_ACCOUNT_CARD);
    db.sequelize.transaction(()=> {
        return Promise.all([
            db.BankAccounts.update(
                { account: db.sequelize.literal('account -' + config.PRIZE_POOL) },
                { where: {card_number: req.body.cardNumber }}  //                    1111222233334444
            ),
            db.BankAccounts.update(
                { account: db.sequelize.literal('account +' + config.PRIZE_POOL) },
                { where: {card_number: config.BANK_ACCOUNT_CARD}}
            ),
        ])
    })
        .then(()=>{
            return Promise.all(insertContestPromises)
        })
        .then(results=> {
            res.status(200).send({results:results, status:"success"})
        })
        .catch(err => {
            console.log(err);
            next(new ApplicationError(err))
        });
};