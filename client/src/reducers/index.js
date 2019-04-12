import {combineReducers} from 'redux'
import testReducer from './contestCreateReducer';
import authReducer from './authReducer';
import checkoutReducer from './checkoutReducer';
import customerContestsReducer from './customerContestsReducer';


const appReducer = combineReducers({
    testReducer,
    authReducer,
    //checkoutReducer,
    customerContestsReducer
});


const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;

