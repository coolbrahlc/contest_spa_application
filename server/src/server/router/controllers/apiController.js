const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../utils/consts');
const db = require('../../models/index');
const {UserAlreadyExistsError,
        WrongPasswordError,
        ApplicationError,
        UnauthorizedError,
        UserNotFoundError} = require('../../utils/customErrrors/errors');


// module.exports.getContestsByCustomerId =  async (req, res , next) => {
//
//     const accessToken = req.get("Authorization");
//     req.decoded = jwt.verify(accessToken, config.SECRET);
//
//     let flag = req.params.flag;
//     console.log(Boolean(parseInt(req.params.flag)));
//
//     try {
//         let customersContests = {};
//         if (flag==='all' && !req.params.id) {
//             customersContests = await db.Contests.findAll();
//         } else if (flag==='all' && req.params.id) {
//             customersContests = await db.Contests.findAll({where:{creator_id: req.params.id }});
//         }
//         else {
//             customersContests = await db.Contests.findAll(
//                 {where:
//                         {creator_id: req.params.id ,
//                          completed:Boolean(parseInt(flag))
//                         }
//                 });
//         }
//
//         if (!customersContests) {
//             res.send('not found')
//         }
//         res.status(200).send(customersContests)
//     } catch (e) {
//         console.log(e);
//         res.status(500).send(e)
//     }
// };

module.exports.getContestsById =  async (req, res , next) => {

    console.log("decoded", req.decoded.role);

    try {
        let contest = await db.Contests.findOne(
            {where:{id: req.params.id},
                include: [{ model: db.Suggestions }]
            },
        );

        // if (req.decoded.role===0) {
        //     if (contest.creator_id===req.decoded.id) {
        //         res.status(200).send(contest)
        //     } else {
        //         next(new UnauthorizedError('Customer can view only his contest'))
        //     }
        // } else {
        //     if (contest.is_active === true || contest.completed === true) {
        //         res.status(200).send(contest)
        //     } else {
        //         next(new UnauthorizedError('Creative can not see inactive contests'))
        //     }
        // }

        res.status(200).send(contest)

        if (!contest) {
            next(new ApplicationError('Not found'))
        }
    } catch (e) {
        next(new ApplicationError('Internal error'))
    }
};



module.exports.getContests =  async (req, res , next) => {


    if (req.decoded.role===0) {
        req.body.params.creator_id = req.decoded.id
    }

    try {
        let customersContests = await db.Contests.findAll(
            {where:req.body.params,
                include: [
                    {
                        model: db.Suggestions,
                    }
                ]
            },
        );
        customersContests.map(contest => {
            contest.dataValues.entriesCount = contest.Suggestions.length
        });

        if (!customersContests) {
            next(new ApplicationError('Not found'))
        }
        res.status(200).send(customersContests)
    } catch (e) {
        next(new ApplicationError('Internal error'))
    }
};

//!!!!
module.exports.getCreatorEntries =  async (req, res , next) => {
    try {
        let creatorEntries = await db.Suggestions.findAll({where:{user_id: req.id}});

        if (!creatorEntries) {
            res.send('not found')
        }
        res.status(200).send(creatorEntries)
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
};


// module.exports.getCreatorContests =  async (req, res , next) => {
//     try {
//         console.log(db);
//         let creatorContests = await db.ContestParticipants.findAll(
//             {
//             where:{participant_id: req.params.id},
//             include: [
//                 {
//                 model: db.Contests,
//                 attributes: ['name'],
//                 as: 'contest',
//                 required: true
//                 }
//             ]
//         }
//         );
//
//         if (!creatorContests) {
//             res.send('not found')
//         }
//         res.status(200).send(creatorContests)
//     } catch (e) {
//         console.log(e);
//         res.status(500).send(e)
//     }
// };


module.exports.updateContest = async (req,res,next) => {
    const edit = req.body.contest;
    try {
        const contest = await Contest.update(edit, {
            returning: true,
            where: {
                id: edit.id
            }
        });
        if (contest) {
            res.send(contest);
        }
    }
    catch (e) {
        next(e);
    }
};
