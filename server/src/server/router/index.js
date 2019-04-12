import 'babel-polyfill';
const express = require('express');
const router = express.Router();
const controller = require('./controllers/apiController');
const auth = require('./controllers/authController');
const selects = require('./controllers/selectsController');
const transaction = require('./controllers/transactionController');
const middleware = require('../middlewares/createContest');

const fileUpload = require('../utils/fileUpload');

const db = require('../models/index');
const moment = require('moment');


router.post('/contests/', auth.tokenCheck, controller.getContests);
router.get('/contests/:id/', auth.tokenCheck, controller.getContestsById);
router.put('/contests/:id/', auth.tokenCheck, fileUpload.rules,
                                                controller.updateContest,
                                                controller.getContestsById);

router.post('/contests/create', auth.tokenCheck,   // TODO validator
                                fileUpload.rules,
                                transaction.checkCreditCard,
                                middleware.setActiveContest,
                                transaction.createContests);

router.post('/login', auth.login);      // TODO validator
router.post('/register', auth.register, auth.createNewToken, auth.tokenUpdate);        // TODO validator auth.sendToken
//router.post('/token', auth.tokenCheck, auth.createNewToken, auth.tokenUpdate);
router.post('/token', auth.tokenCheck, auth.sendToken);
router.get('/selects/', selects.getAllSelects);

router.put('/entry/reject', auth.tokenCheck, transaction.rejectSuggestion);
router.put('/entry/winner', auth.tokenCheck, transaction.setWinnerSuggestion);



module.exports = router;




