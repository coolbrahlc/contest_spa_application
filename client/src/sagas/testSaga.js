import { put } from 'redux-saga/effects'
import ACTION from '../actions/actiontsTypes'
import {getAllUsers, getUserProfile, getAllSelects} from '../api/rest/restContoller'


// export function* testFunc() {
//     yield put({type: ACTION.USERS_REQUEST});
//
//     try {
//
//         const {data} = yield getAllUsers();
//         yield put({type:ACTION.USERS_RESPONSE, users:data})
//     }
//         catch (e) {
//         yield put({type:ACTION.USERS_ERROR, error:e})
//     }
// }

// export function* getUserProfileSaga(action) {
//
//     yield put({type: ACTION.USER_PROFILE_REQUEST});
//
//     try {
//         const {data} = yield getUserProfile(action.id);
//
//         yield put({type:ACTION.USER_PROFILE_RESPONSE, user:data})
//     }
//     catch (e) {
//         yield put({type:ACTION.USER_ERROR, error:e})
//     }
// }

export function* setArrayOrder(action) {

        yield put({type:ACTION.GET_ARRAY_ORDER, contestsToInsert:action.arr})

}

export function* collectForm(action) {

    yield put({type:ACTION.GET_ARRAY_ORDER, contestsToInsert:action.arr})

}


export function* getAllSelectsSaga() {

    try {
        const {data} = yield getAllSelects();
        yield put({type:ACTION.SET_SELECTS, selects:data})
    }
    catch (e) {
        yield put({type:ACTION.API_ERROR, error:e})
    }
}