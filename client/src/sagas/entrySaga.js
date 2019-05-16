import ACTION from "../actions/actiontsTypes";
import * as restController from "../api/rest/restContoller";
import {put} from 'redux-saga/effects';
import {toast} from 'react-toastify';


export function* setEntryWinnerSaga(action){
    yield put({type: ACTION.ENTRY_REQUEST});
    try{
        const {data} = yield restController.setEntryWinner(action.data);
        //const {creatorId, contestId} = action.data
        yield put({type: ACTION.ENTRY_WIN_RESPONSE, data});
    }
    catch (e) {
        yield put({type: ACTION.ENTRY_ERROR, error: e});
    }
}

export function* rejectEntrySaga(action){

    yield put({type: ACTION.ENTRY_REQUEST});
    try{
        const {data} = yield restController.rejectEntry(action.data);
        yield put({type: ACTION.ENTRY_REJECT_RESPONSE, data});
    }
    catch (e) {
        yield put({type: ACTION.ENTRY_ERROR, error: e});
    }
}

export function* createEntrySaga(action){
    yield put({type: ACTION.ENTRY_REQUEST});
    try{
        const {fdata, /*contestCreator*/} = action.data;
        const {data} = yield restController.createEntry(fdata);
        toast('Entry created');
        yield put({type: ACTION.ENTRY_CREATE_RESPONSE, data});
    }
    catch (e) {
        console.log('err', e);
        yield put({type: ACTION.ENTRY_ERROR, error: e});
    }
}

export function* listEntriesSaga(action){
    yield put({type: ACTION.LIST_CHATS_REQUEST});
    try{
        const {data} = yield restController.listEntries();
        yield put({type: ACTION.LIST_ENTRIES_RESPONSE, data});
    }
    catch (e) {
        console.log('err', e);
        yield put({type: ACTION.LIST_ENTRIES_ERROR, error: e});
    }
}

