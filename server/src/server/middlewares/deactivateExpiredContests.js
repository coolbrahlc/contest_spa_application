const moment = require('moment');
const db = require('../models/index');
const cron = require('node-cron');


cron.schedule('* * * * *', () => {
    console.log('Deactivating exipired contests');
    cronTask().then(res => {
        res.map(el => console.log(el.dataValues.id) )
    });
});


//Deactivating exipired contests
const cronTask = async () => {
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


