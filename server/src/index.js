global._babelPolyfill = false;
import express from 'express';
const router = require('./server/router/index');
import cors from 'cors';
const error = require('./server/utils/errorHandler');
const { controller } = require('./server/router/controllers/socketController');
const cron = require('node-cron');
const { cronTask } = require('./server/middlewares/deactivateExpiredContests');
const PORT = process.env.PORT || 3000;
const app = express();
const server = require('http').Server(app);
const {mongoose}= require('./server/db/mongoose');

app.use(cors());
app.use(express.json());
app.use(router);
app.use(error.errorHandler);

server.listen(PORT);
controller.connect(server);


cron.schedule('* * * * *', () => {
    console.log('Deactivating exipired contests');
    cronTask().then(res => {
        res.map(el => console.log(el.dataValues.id));
    });
});

module.exports.serv = server;
