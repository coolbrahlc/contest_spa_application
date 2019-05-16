import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import * as restController from '../api/rest/restContoller';
import {toast} from 'react-toastify';
//import Notification from "../components/Notification/Notification";


export function* checkoutSaga(action){
    yield put({type: ACTION.CHECKOUT_REQUEST});
    try {
        let res = yield restController.checkout(action.data);
        yield put({type: ACTION.CHECKOUT_RESPONSE});
        toast('Successful payment');
        console.log(res)
    }
    catch (e) {
        console.log(e.response.data.message);
        yield put({type: ACTION.CHECKOUT_ERROR, error: e.response.data.message});
    }
}
export function* creativeCheckoutSaga(action){
    yield put({type: ACTION.CHECKOUT_REQUEST});
    try {
        let {data} = yield restController.creativeCheckout(action.data);
        toast('Successful checkout');
        yield put({type: ACTION.EDIT_PROFILE_RESPONSE, data});
        yield put({type: ACTION.PROFILE_EDIT_CLEAN});
    }
    catch (e) {
        yield put({type: ACTION.EDIT_PROFILE_ERROR, error: e.response.data.message});
    }
}
