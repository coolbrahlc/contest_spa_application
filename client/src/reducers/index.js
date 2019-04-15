import {combineReducers} from 'redux'
import testReducer from './contestCreateReducer';
import authReducer from './authReducer';
import customerContestsReducer from './customerContestsReducer';


const appReducer = combineReducers({
    testReducer,
    authReducer,
    customerContestsReducer
});


const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;

