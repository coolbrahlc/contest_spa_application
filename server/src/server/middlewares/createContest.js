const uuid = require('node-uuid');
const config = require('../utils/consts');
const dateSet = require('../utils/dateSet');

module.exports.setActiveContest = (req, res, next) => {

    //console.log("files: ",req.files);

    const contestsBody = Object.assign({}, req.body);
    delete contestsBody['cardNumber'];

    let contests = [];
    Object.keys(contestsBody).forEach(key => {
        contests.push(JSON.parse(contestsBody[key]));
    });

    let prize_pool = parseInt(config.PRIZE_POOL/contests.length);
    const orderId = uuid.v1();

    contests.map((contest) =>{
        contest.creator_id = req.decoded.id;
        contest.order_id = orderId;
        contest.is_active = false;
        contest.prize_pool = prize_pool;

        let fileField = req.files[contest.type+'File'] ;  // adding file path
        if (fileField) {
            contest.file = fileField[0].filename;
        }
    });
    const first = contests[0];
    first.is_active = true;
    first.end_date = dateSet.addDays(contests[0].days_passed);

    req.contests= contests;
    next();
};

