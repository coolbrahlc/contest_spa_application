const config = require('../../utils/consts');
const db = require('../../models/index');
const { ApplicationError, UnauthorizedError} = require('../../utils/customErrrors/errors');


module.exports.getContestsById =  async (req, res , next) => {
    try {
        let contest = await db.Contests.findOne(
            {where:{id: req.params.id},
                include: [{model: db.Users}, { model: db.Suggestions,
                    include: [{
                        model: db.Users,
                        attributes: ['full_name', 'profile_picture']
                    }]
                }]
            },
        );
        if (req.decoded.role===0) {
            if (contest.creator_id!==req.decoded.id) {
                next(new UnauthorizedError('Customer can view only his contest'))
            }
        } else {
            if (contest.is_active !== true ) {
                next(new UnauthorizedError('Creative can not see inactive contests'))
            }
        }

        res.status(200).send(contest);

        if (!contest) {
            next(new ApplicationError('Not found'))
        }
    } catch (e) {
        next(new ApplicationError('Internal error'))
    }
};


module.exports.getContests =  async (req, res , next) => {

    const params = req.body.params;
    if (req.decoded.role===0) {
        params.creator_id = req.decoded.id;
    } else {
        params.is_active = true
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

module.exports.updateContest = async (req,res,next) => {

    const contestBody = Object.assign({}, req.body);
    let contest = [];
    Object.keys(contestBody).forEach(key => {
        contest.push(JSON.parse(contestBody[key]));
    });

    const edit =  contest[0];
    console.log(edit.type);

    let fileField = req.files[edit.type.toLowerCase()+'File'] ;  // adding file path
    console.log(fileField);

    if (fileField) {
        edit.file = fileField[0].filename;
    }


    try {
        const contest = await db.Contests.update(edit, {
            returning: true,
            where: {
                id: req.params.id
            }
        });
        if (contest) {
            next()
        }
    }
    catch (e) {
        next(e);
    }
};


