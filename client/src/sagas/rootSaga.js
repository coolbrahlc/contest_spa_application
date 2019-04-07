import {takeLatest} from 'redux-saga/effects'
import ACTION from '../actions/actiontsTypes'
import {testFunc, getUserProfileSaga, setArrayOrder, collectForm, getAllSelectsSaga} from './testSaga'
import {registerSaga, loginSaga, authSaga} from './authSaga';
import {checkoutSaga} from './checkoutSaga';
import {contestsSaga, getContestsById, getAllContestsSaga} from './contestsSaga';



function* rootSaga() {
    // yield takeLatest(ACTION.TEST_ACTION, testFunc);
    // yield takeLatest(ACTION.GET_USER_PROFILE, getUserProfileSaga);
    yield takeLatest(ACTION.SET_ARRAY_ORDER, setArrayOrder);
    yield takeLatest(ACTION.COLLECT_FORM_DATA, collectForm);
    yield takeLatest(ACTION.GET_SELECTS, getAllSelectsSaga);

    yield takeLatest(ACTION.USER_REGISTER, registerSaga);
    yield takeLatest(ACTION.USER_LOGIN, loginSaga);
    yield takeLatest(ACTION.USER_AUTH, authSaga);

    yield takeLatest(ACTION.CHECKOUT, checkoutSaga);
    yield takeLatest(ACTION.GET_CUSTOMER_CONTESTS, contestsSaga);
    yield takeLatest(ACTION.GET_CONTEST_BY_ID, getContestsById);
    yield takeLatest(ACTION.GET_ALL_CONTESTS, contestsSaga);

}

export default rootSaga;