const db = require('../../models/index');
const {UserAlreadyExistsError,
    WrongPasswordError,
    ApplicationError,
    UnauthorizedError,
    UserNotFoundError} = require('../../utils/customErrrors/errors');



module.exports.getSelects = (req, res, next) => {
    console.log(req);
    db.Selects.findAll({
        attributes: ['name'],
        where: {contest_type: req.params.type}})
        .then(user => {
            res.send(user);
        });
};

module.exports.getAllSelects = (req, res, next) => {
    db.Selects.findAll({ attributes: ['name', 'contest_type'] })
        .then(user => {
            res.send(user);
        });
};
