const db = require('../../models/index');
const {ApplicationError} = require('../../utils/customErrrors/errors');

module.exports.getAllSelects = (req, res, next) => {
    db.Selects.findAll({ attributes: ['name', 'contest_type'] })
        .then(user => {
            res.send(user);
        })
        .catch(error => new ApplicationError(error.message));
};
