import {put} from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import * as restController from '../api/rest/restContoller';


export function* sendMessageSaga(action){
    try{
        yield restController.sendMessage(action.data);
    }
    catch (e) {
        console.log(e)
    }
}

export function* creteChatSaga(action){
    yield put({ type: ACTION.CREATE_CHAT_REQUEST});
    try{
        let {data} = yield restController.startConversation(action.data);
        //console.log('conversation started', data);
        yield put({ type: ACTION.CREATE_CHAT_RESPONSE, data });
    }
    catch (e) {
        console.log(e);
        yield put({ type: ACTION.CREATE_CHAT_ERROR, error:e});
    }
}

export function* listMyChatsSaga(action){
    yield put({ type: ACTION.LIST_CHATS_REQUEST});
    try{
        const {data} = yield restController.listMyChats(action.data);
        yield put({ type: ACTION.LIST_CHATS_RESPONSE, data});
    }
    catch (e) {
        console.log(e);
        yield put({ type: ACTION.LIST_CHATS_ERROR, error:e});
    }
}

export function* loadMoreSaga(action){
    try{
        const {data} = yield restController.startConversation(action.data);
        yield put({ type: ACTION.CHAT_LOAD_MORE_RESPONSE, data});
    }
    catch (e) {
        console.log(e);
        yield put({ type: ACTION.LIST_CHATS_ERROR, error:e});
    }
}
