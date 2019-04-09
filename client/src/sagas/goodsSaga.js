import { put } from 'redux-saga/effects';
import ACTION from '../actions/actiontsTypes';
import {
  getGoods, getOneGoods,
} from '../api/rest/restContoller';

export function* getGoodsSaga() {
  yield put({ type: ACTION.GOODS_REQUEST });
  try {
    const { data } = yield getGoods();
    yield put({ type: ACTION.GOODS_RESPONSE, goods: data });
  } catch (e) {
    yield put({ type: ACTION.GOODS_ERROR, error: e });
  }
}

export function* getOneGoodsSaga({ id }) {
  yield put({ type: ACTION.GOODS_REQUEST });
  try {
    const { data } = yield getOneGoods(id);
    yield put({ type: ACTION.SINGLE_GOODS_RESPONSE, goods: data });
  } catch (e) {
    yield put({ type: ACTION.GOODS_ERROR, error: e });
  }
}
