import 'babel-polyfill';
const express = require('express');
const router = express.Router();
const { getContests, getContestsById, updateContest } = require('./controllers/contestController');
const { login, register } = require('./controllers/authController');
const { createNewToken, tokenCheck, tokenUpdate, sendToken } = require('../middlewares/token/auth');
const { checkCreditCard } = require('../middlewares/checkCreditCard');
const { getAllSelects } = require('./controllers/selectsController');
const { createContests } = require('./controllers/transactionController');
const { rejectSuggestion, setWinnerSuggestion, createSuggestion } = require('./controllers/entryController');
const { setActiveContest } = require('../middlewares/createContest');
const { fileUpload, getFile } = require('../utils/fileUpload');
const { loginValidator, registerValidator, contestCreateValidator } = require('../utils/validation');
const { customerOnly, creativeOnly, isOwner } = require('../middlewares/permissionCheck');


router.post('/contests/', tokenCheck, getContests);
router.get('/contests/:id/', tokenCheck, getContestsById);
router.put('/contests/:id/', tokenCheck, fileUpload, updateContest, getContestsById);
router.post('/contests/create', tokenCheck, customerOnly, fileUpload, checkCreditCard, setActiveContest, createContests);
router.get('/selects/', getAllSelects);

router.post('/entry/create', tokenCheck, creativeOnly, fileUpload, createSuggestion);
router.put('/entry/reject', tokenCheck, isOwner, rejectSuggestion);
router.put('/entry/winner', tokenCheck, isOwner, setWinnerSuggestion);

router.post('/login', loginValidator, login);
router.post('/register', registerValidator, register, createNewToken, tokenUpdate);
router.post('/token', tokenCheck, sendToken);
//router.post('/token', auth.tokenCheck, auth.createNewToken, auth.tokenUpdate);

router.get('/api/public/:name', getFile);


module.exports = router;
