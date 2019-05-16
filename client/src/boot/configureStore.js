import { createStore, applyMiddleware } from 'redux'; //compose
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import combineReducers from '../reducers';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();


export default function configureStore() {

    const store = createStore(combineReducers, applyMiddleware(sagaMiddleware));

    axios.interceptors.request.use(function(config) {
        const token = localStorage.getItem("token");

        if ( token != null ) {
            config.headers.Authorization = token;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });

    sagaMiddleware.run(rootSaga, store.dispatch);

    return store;
}
