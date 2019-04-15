import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import * as restController from '../api/rest/restContoller';



export function* checkoutSaga(action){
    yield put({type: ACTION.CHECKOUT_REQUEST});
    try{
        let res = yield restController.checkout(action.data);
        yield put({type: ACTION.CHECKOUT_RESPONSE});
        console.log(res)
    }
    catch (e) {
        console.log(e.response.data.message);
        yield put({type: ACTION.CHECKOUT_ERROR, error: e.response.data.message});
    }
}
