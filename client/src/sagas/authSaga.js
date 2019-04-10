import { put } from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {register, login, token} from '../api/rest/restContoller'



export function* registerSaga({data}){
    yield put({ type: ACTION.USER_REQUEST });
    try{
        const res = yield register(data);
        window.localStorage.setItem('token', res.data.token);
        yield put({
            type: ACTION.USER_RESPONSE,
            token: res.data.token,
            role: res.data.role,
            id: res.data.id,
            user: res.data.user,
        });
    }
    catch (e) {
        let errMsg = e.response.data.message;
        yield put({ type: ACTION.USER_ERROR, error: errMsg });
    }
}

export function* loginSaga({data}){
    yield put({ type: ACTION.USER_REQUEST });
    try{
        const res = yield login(data);
        window.localStorage.setItem('token', res.data.token);

        yield put({
            type: ACTION.USER_RESPONSE,
            token: res.data.token,
            role: res.data.role,
            id: res.data.id,
            user: res.data.user,
        });
    }
    catch (e) {
        let errMsg = e.response.data.message;
        yield put({ type: ACTION.USER_ERROR, error: errMsg });
    }
}

export function* authSaga(){
    yield put({ type: ACTION.USER_REQUEST});
    try{
        const res = yield token();
        window.localStorage.setItem('token', res.data.token);
        yield put({
            type: ACTION.USER_RESPONSE,
            token: res.data.token,
            role: res.data.role,
            id: res.data.id,
            user: res.data.user,
        });
    }
    catch (e) {
        yield put({ type: ACTION.USER_ERROR, error: e});
    }
}

