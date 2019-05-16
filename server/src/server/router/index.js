import 'babel-polyfill';
const express = require('express');
const router = express.Router();
const { getContests, getContestsById, updateContest } = require('./controllers/contestController');
const { login, register, updateUser, cashout } = require('./controllers/userController');
const { createNewToken, tokenCheck, tokenUpdate, sendToken } = require('../middlewares/token/auth');
const { checkCreditCard } = require('../middlewares/checkCreditCard');
const { getAllSelects } = require('./controllers/selectsController');
const { createContests } = require('./controllers/transactionController');
const { rejectSuggestion, setWinnerSuggestion, createSuggestion, listEntries } = require('./controllers/entryController');
const { changeStatusSuggestion } = require('./controllers/entryController');
const { setActiveContest } = require('../middlewares/createContest');
const { fileUpload, getFile } = require('../utils/fileUpload');
const { loginValidator, registerValidator, /*contestCreateValidator*/ } = require('../utils/validation');
const { customerOnly, creativeOnly, isOwner, isModerator } = require('../middlewares/permissionCheck');
const { updateRoom, getRoom, listAllRooms } = require('./controllers/chatController');


router.post('/contests/', tokenCheck, getContests);
router.get('/contests/:id/', /*tokenCheck, */getContestsById);
router.put('/contests/:id/', tokenCheck, fileUpload, updateContest, getContestsById);
router.post('/contests/create', tokenCheck, customerOnly, fileUpload, checkCreditCard, setActiveContest, createContests);
router.get('/selects/', getAllSelects);

router.post('/entry/create', tokenCheck, creativeOnly, fileUpload, createSuggestion);
router.put('/entry/reject', tokenCheck, isOwner, rejectSuggestion);
router.put('/entry/winner', tokenCheck, isOwner, setWinnerSuggestion);

router.get('/entry/all', tokenCheck, isModerator, listEntries);
router.put('/moderator/status', tokenCheck, isModerator, changeStatusSuggestion);

router.post('/login', loginValidator, login);
router.post('/register', registerValidator, register, createNewToken, tokenUpdate);
router.post('/token', tokenCheck, sendToken);
router.put('/user', tokenCheck, fileUpload, updateUser);
router.post('/user/checkout', tokenCheck, cashout);

router.post('/message/create', updateRoom);
router.post('/conversation/start', tokenCheck, getRoom);
router.post('/conversation/list', listAllRooms);
//router.get('/conversation/:id', getConversation);

//router.post('/token', auth.tokenCheck, auth.createNewToken, auth.tokenUpdate);
router.get('/api/public/:name', getFile);


module.exports = router;
