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
        yield put({type: ACTION.GET_CUSTOMER_CONTESTS_ERROR, error: e.response.data.message});
    }
}


export function* getContestsById(action){
    yield put({type: ACTION.GET_CONTEST_BY_ID_REQUEST});
    try{
        const {data} = yield restController.getContestById(action.data);
        yield put({type: ACTION.GET_CONTEST_BY_ID_RESPONSE, data});
    }
    catch (e) {
        yield put({type: ACTION.GET_CUSTOMER_CONTESTS_ERROR, error: e.response.data.message});
    }
}


// export function* getAllContestsSaga(action){
//     yield put({type: ACTION.GET_CUSTOMER_CONTESTS_REQUEST});
//     try{
//         const {data} = yield restController.getCustomerContests(action.data);
//         console.log("data", data);
//         if(data) {
//             yield put({type: ACTION.GET_CUSTOMER_CONTESTS_RESPONSE, data: data});
//         }
//     }
//     catch (e) {
//         yield put({type: ACTION.GET_CUSTOMER_CONTESTS_ERROR, error: e.response.data.message});
//     }
// }
