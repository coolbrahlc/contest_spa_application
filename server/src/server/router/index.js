import 'babel-polyfill';
const express = require('express');
const router = express.Router();
const { getContests, getContestsById, updateContest } = require('./controllers/contestController');
const { login, register } = require('./controllers/authController');
const { createNewToken, tokenCheck, tokenUpdate, sendToken } = require('../middlewares/token/auth');
const { getAllSelects } = require('./controllers/selectsController');
const { checkCreditCard, createContests } = require('./controllers/transactionController');
const { rejectSuggestion, setWinnerSuggestion, createSuggestion } = require('./controllers/entryController');
const { setActiveContest } = require('../middlewares/createContest');
const { fileUpload, getFile } = require('../utils/fileUpload');


router.post('/contests/', tokenCheck, getContests);
router.get('/contests/:id/', tokenCheck, getContestsById);
router.put('/contests/:id/', tokenCheck, fileUpload, updateContest, getContestsById);
router.post('/contests/create', tokenCheck, fileUpload, checkCreditCard, setActiveContest, createContests);
router.get('/selects/', getAllSelects);

router.post('/entry/create', tokenCheck, fileUpload, createSuggestion);
router.put('/entry/reject', tokenCheck, rejectSuggestion);
router.put('/entry/winner', tokenCheck, setWinnerSuggestion);

router.post('/login', login);
router.post('/register', register, createNewToken, tokenUpdate);
router.post('/token', tokenCheck, sendToken);
//router.post('/token', auth.tokenCheck, auth.createNewToken, auth.tokenUpdate);

router.get('/api/public/:name', getFile);


module.exports = router;
