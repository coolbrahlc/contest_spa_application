const moment = require('moment');
const db = require('../models/index');

//Deactivating exipired contests
module.exports.cronTask = async () => {
    const op =db.Sequelize.Op;
    const contt= await db.Contests.update(
        {is_active: false, completed: true},
        {
            where: {
                end_date: {
                    [op.lte]: moment().toDate(),
                }
            },
            returning: true
        });

    return contt[1]
};


