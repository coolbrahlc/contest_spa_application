import {combineReducers} from 'redux'
import testReducer from './contestCreateReducer';
import authReducer from './authReducer';
import customerContestsReducer from './customerContestsReducer';
import userProfileReducer from './userProfileReducer';


const appReducer = combineReducers({
    testReducer,
    authReducer,
    customerContestsReducer,
    userProfileReducer
});


const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;

