const config = require('../../utils/consts');
const db = require('../../models/index');
const { ApplicationError, UnauthorizedError} = require('../../utils/customErrrors/errors');
const { CUSTOMER_ROLE, CREATIVE_ROLE, TAGLINE_TYPE, LOGO_TYPE } = require('../../utils/consts');


module.exports.getContestsById =  async (req, res , next) => {
    try {
        let contest = await db.Contests.findOne(
            {where:{id: req.params.id},
                include: [{model: db.Users}, { model: db.Suggestions,
                    include: [{
                        model: db.Users,
                        attributes: ['full_name', 'profile_picture', 'email', 'id'],
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

    const { params, offset } = req.body;
    if (req.decoded.role===CUSTOMER_ROLE) {
        params.creator_id = req.decoded.id;
    } else {
        params.is_active = true;
    }
    try {
        const customersContests = await db.Contests.findAll(
    {   where:req.body.params,
                order: [
                    ['id', 'DESC'],
                ],
                limit: 8,
                offset: offset ? offset : 0,
                include: [{  model: db.Suggestions }] }
        );
        customersContests.map(contest => {
            contest.dataValues.entriesCount = contest.Suggestions.length;
        });

        if (!customersContests) {
            next(new ApplicationError('Not found'));
        }
        console.log(customersContests)
        res.status(200).send(customersContests);
    } catch (e) {
        next(new ApplicationError('Internal error'));
    }
};

module.exports.updateContest = async (req, res, next) => {
    try {
        const checkContest = await db.Contests.findOne({where:{id: req.params.id}});
        if (checkContest.creator_id!==req.decoded.id) {
            next(new UnauthorizedError('Customer can update only his contest'));
        }
        let edit = Object.values(req.body);
        edit = JSON.parse(edit[0]);

        const fileField = req.files[edit.type.toLowerCase()+'File'] ;  // adding file path

        if (fileField) {
            edit.file = fileField[0].filename;
        }

        const updated = await db.Contests.update(edit, {
            where: {
                id: req.params.id,
            },
            returning: true,
        });
        if (updated[0]<1) {
            throw new ApplicationError('Entry not found');
        }
        const updatedContest = updated[1][0].dataValues;
        res.status(200).send(updatedContest);
    }
    catch (e) {
        next(new ApplicationError('Internal error'));
    }
};


