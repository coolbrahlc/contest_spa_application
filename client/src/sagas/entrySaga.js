import ACTION from "../actions/actiontsTypes";
import * as restController from "../api/rest/restContoller";
import {put} from 'redux-saga/effects';

export function* setEntryWinnerSaga(action){
    yield put({type: ACTION.GET_CONTEST_BY_ID_REQUEST});
    try{
        const {data} = yield restController.setEntryWinner(action.data);
        console.log("data", data);
        yield put({type: ACTION.GET_CONTEST_BY_ID_RESPONSE, data: data});
    }
    catch (e) {
        yield put({type: ACTION.GET_CUSTOMER_CONTESTS_ERROR, error: e});
    }
}

export function* rejectEntrySaga(action){

    yield put({type: ACTION.GET_CONTEST_BY_ID_REQUEST});
    try{
        const {data} = yield restController.rejectEntry(action.data);

        yield put({type: ACTION.GET_CONTEST_BY_ID_RESPONSE, data: data});
    }
    catch (e) {
        yield put({type: ACTION.GET_CUSTOMER_CONTESTS_ERROR, error: e});
    }
}

export function* createEntrySaga(action){
    yield put({type: ACTION.ENTRY_REQUEST});
    try{
        const {data} = yield restController.createEntry(action.data);
        console.log(data);
        yield put({type: ACTION.GET_CONTEST_BY_ID_RESPONSE, data: data});
    }
    catch (e) {
        yield put({type: ACTION.ENTRY_ERROR, error: e});
    }
}


