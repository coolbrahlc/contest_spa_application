const db = require('../../models/index');


module.exports.getAllUsers =  function(req, res) {
    db.Users.findAll().then(user => {
        res.send(user);
    });
};

module.exports.getUserById =  function(req, res) {
    db.Users.findOne({where: {id: req.params.id}}).then(user => {
        res.send(user);
    });
};