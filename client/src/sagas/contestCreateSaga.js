import { put } from 'redux-saga/effects'
import ACTION from '../actions/actiontsTypes'
import {getAllSelects} from '../api/rest/restContoller'



export function* setArrayOrder(action) {
    yield put({type:ACTION.GET_ARRAY_ORDER, contestsToInsert:action.arr})
}

export function* collectForm(action) {
    yield put({type:ACTION.FORM_DATA_SET, contestFormData:action.data})
}


export function* getAllSelectsSaga() {

    yield put({ type: ACTION.GET_SELECTS_REQUEST });

    try {
        const {data} = yield getAllSelects();
        yield put({type:ACTION.GET_SELECTS_RESPONSE, selects:data})
    }
    catch (e) {
        yield put({type:ACTION.API_ERROR, error:e})
    }

}