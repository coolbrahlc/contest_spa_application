import {combineReducers} from 'redux'
import contestCreateReducer from './contestCreateReducer';
import authReducer from './userReducer';
import customerContestsReducer from './customerContestsReducer';
import chatReducer from './chatReducer';
import moderatorReducer from './moderatorReducer';

import { reducer as formReducer } from 'redux-form'
import ACTION from '../actions/actiontsTypes';



const appReducer = combineReducers({
    contestCreateReducer,
    authReducer,
    customerContestsReducer,
    chatReducer,
    moderatorReducer,
    form: formReducer.plugin({
        cashoutProfile: (state, action) => {
            switch(action.type) {
                case ACTION.PROFILE_EDIT_CLEAN:
                    return undefined;
                default:
                    return state;
            }
        }
    })
});


const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;

