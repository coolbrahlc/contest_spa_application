import ACTION from "../actions/actiontsTypes";
import * as restController from "../api/rest/restContoller";
import {put} from 'redux-saga/effects';
import {toast} from 'react-toastify';


export function* changeStatusSaga(action){
    yield put({type: ACTION.CONFIRM_ENTRY_REQUEST});
    try{
        const {data} = yield restController.moderChangeStatusEntry(action.data);
        yield put({type: ACTION.CONFIRM_ENTRY_RESPONSE, data});
    }
    catch (e) {
        yield put({type: ACTION.CONFIRM_ENTRY_ERROR, error: e});
    }
}
