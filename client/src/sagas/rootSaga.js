import {takeLatest} from 'redux-saga/effects'
import ACTION from '../actions/actiontsTypes'
import {setArrayOrder, collectForm, getAllSelectsSaga} from './contestCreateSaga'
import {registerSaga, loginSaga, authSaga} from './authSaga';
import {checkoutSaga, creativeCheckoutSaga} from './checkoutSaga';
import {contestsSaga, getContestsById, updateContestSaga, moreContestsSaga} from './contestsSaga';
import {setEntryWinnerSaga, rejectEntrySaga, createEntrySaga} from './entrySaga';
import {userProfileSaga} from './userProfileSaga';


function* rootSaga() {
    yield takeLatest(ACTION.SET_ARRAY_ORDER, setArrayOrder);
    yield takeLatest(ACTION.COLLECT_FORM_DATA, collectForm);
    yield takeLatest(ACTION.GET_SELECTS, getAllSelectsSaga);

    yield takeLatest(ACTION.USER_REGISTER, registerSaga);
    yield takeLatest(ACTION.USER_LOGIN, loginSaga);
    yield takeLatest(ACTION.USER_AUTH, authSaga);

    yield takeLatest(ACTION.CHECKOUT, checkoutSaga);
    yield takeLatest(ACTION.GET_CUSTOMER_CONTESTS, contestsSaga);
    yield takeLatest(ACTION.GET_MORE_CONTESTS, moreContestsSaga);
    yield takeLatest(ACTION.GET_CONTEST_BY_ID, getContestsById);
    yield takeLatest(ACTION.GET_ALL_CONTESTS, contestsSaga);
    yield takeLatest(ACTION.UPDATE_CONTEST, updateContestSaga);

    yield takeLatest(ACTION.SET_ENTRY_WINNER, setEntryWinnerSaga);
    yield takeLatest(ACTION.REJECT_ENTRY, rejectEntrySaga);
    yield takeLatest(ACTION.CREATE_ENTRY, createEntrySaga);
    yield takeLatest(ACTION.EDIT_USER_PROFILE, userProfileSaga);
    yield takeLatest(ACTION.CREATIVE_CHECKOUT, creativeCheckoutSaga);
}

export default rootSaga;
