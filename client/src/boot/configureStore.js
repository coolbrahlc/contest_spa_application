import { createStore, applyMiddleware } from 'redux'; //compose
import createSagaMiddleware from 'redux-saga';

import combineReducers from '../reducers';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();


export default function configureStore() {

    const store = createStore(combineReducers, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga, store.dispatch);

    return store;
}