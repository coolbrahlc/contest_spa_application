const uuid = require('node-uuid');
const config = require('../utils/consts');
const dateSet = require('../utils/dateSet');
import { CREATIVE_ROLE, CUSTOMER_ROLE, MODERATOR_ROLE } from '../utils/consts';
const { ApplicationError, UnauthorizedError } = require('../utils/customErrrors/errors');
const db = require('../models/index');


module.exports.creativeOnly = async (req, res, next) => {
    if (req.decoded.role === CUSTOMER_ROLE) {
        next(new UnauthorizedError());
    }
    next();
};

module.exports.customerOnly = async (req, res, next) => {
    if (req.decoded.role === CREATIVE_ROLE) {
        next(new UnauthorizedError());
    }
    next();
};

module.exports.isModerator = async (req, res, next) => {
    if (req.decoded.role !== MODERATOR_ROLE) {
        next(new UnauthorizedError());
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { contestId } = req.body;

    try{
        const checkIsOwner = await db.Contests.findOne({
            attributes: ['creator_id'],
            where: {
                id: contestId,
            },
        });
        if (checkIsOwner.dataValues.creator_id!==req.decoded.id) {
            throw new ApplicationError('Permission denied');
        }
        next();
    } catch (e) {
        next(new ApplicationError('Permission denied'));
    }

};

