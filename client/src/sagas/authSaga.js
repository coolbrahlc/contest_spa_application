import { put } from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {register, login, token} from '../api/rest/restContoller'
import { controller } from '../api/socket/socketController';


export function* registerSaga({data}){
    yield put({ type: ACTION.USER_REQUEST });
    try{
        const res = yield register(data);
        controller.subscribe(res.data.id);
        window.localStorage.setItem('token', res.data.token);
        yield put({
            type: ACTION.USER_RESPONSE,
            token: res.data.token,
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
        controller.subscribe(res.data.id);
        yield put({
            type: ACTION.USER_RESPONSE,
            token: res.data.token,
            user: res.data.user,
        });
    }
    catch (e) {
        let errMsg = e.response.data.message;
        yield put({ type: ACTION.USER_ERROR, error: errMsg });
    }
}

export function* logoutSaga({id}){
    try{
        controller.unsubscribe(id);
        yield put({ type: ACTION.USER_LOGOUT });
    } catch (e) {
        console.log(e)
    }
}

export function* authSaga(){
    yield put({ type: ACTION.USER_REQUEST});
    try{
        const {data} = yield token();
        controller.subscribe(data.id);
        window.localStorage.setItem('token', data.token);
        yield put({
            type: ACTION.USER_RESPONSE,
            token: data.token,
            user: data.user,
        });
    }
    catch (e) {
        let errMsg = e.response.data.message;
        console.log('err auth', e);
        window.localStorage.removeItem('token');
        yield put({ type: ACTION.USER_ERROR, error: errMsg});
    }
}

