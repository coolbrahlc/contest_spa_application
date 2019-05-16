import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import * as restController from '../api/rest/restContoller';


export function* contestsSaga(action){
    yield put({type: ACTION.GET_CUSTOMER_CONTESTS_REQUEST});
    try{
        const {data} = yield restController.getCustomerContests(action.data);
        if(data) {
            yield put({type: ACTION.GET_CUSTOMER_CONTESTS_RESPONSE, data});
        }
    }
    catch (e) {
        console.log(e)
        yield put({type: ACTION.GET_CUSTOMER_CONTESTS_ERROR, error: e.response.data.message});
    }
}

export function* filteredContestsSaga(action){
    try{
        const {data} = yield restController.getCustomerContests(action.data);
        if(data) {
            yield put({type: ACTION.GET_CUSTOMER_CONTESTS_RESPONSE, data});
        }
    }
    catch (e) {
        yield put({type: ACTION.GET_CUSTOMER_CONTESTS_ERROR, error: e.response.data.message});
    }
}


export function* moreContestsSaga(action){
    yield put({type: ACTION.GET_MORE_CONTESTS_REQUEST});
    try{
        const {data} = yield restController.getCustomerContests(action.data);
        if(data) {
            yield put({type: ACTION.GET_MORE_CONTESTS_RESPONSE, data});
        }
    }
    catch (e) {
        console.log(e)
        yield put({type: ACTION.GET_MORE_CONTESTS_ERROR, error: e.response.data.message});
    }
}


export function* getContestsById(action){
    try{
        const {data} = yield restController.getContestById(action.data);
        yield put({type: ACTION.GET_CONTEST_BY_ID_RESPONSE, data});
    }
    catch (e) {
        yield put({type: ACTION.GET_CUSTOMER_CONTESTS_ERROR, error: e.response.data.message});
    }
}


export function* updateContestSaga(action){
    //yield put({type: ACTION.UPDATE_CONTEST_REQUEST});
    try{
        const {data} = yield restController.updateContest(action.data);
        yield put({type: ACTION.UPDATE_CONTEST_RESPONSE, data});
    }
    catch (e) {
        yield put({type: ACTION.UPDATE_CONTEST_ERROR, error: e.response.data.message});
    }
}



