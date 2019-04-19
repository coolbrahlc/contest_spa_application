import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import * as restController from '../api/rest/restContoller';

export function* userProfileSaga(action){
    yield put({type: ACTION.EDIT_PROFILE_REQUEST});
    try{
        const {data} = yield restController.editProfile(action.data);
        yield put({type: ACTION.EDIT_PROFILE_RESPONSE, data});
    }
    catch (e) {
        yield put({type: ACTION.EDIT_PROFILE_ERROR, error: e.response.data.message});
    }
}



