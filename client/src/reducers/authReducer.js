import ACTION from '../actions/actiontsTypes';

const initialState = {
    isFetching: true,
    error: null,
    token: null,
    user: null,
    editError: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        case ACTION.USER_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        }

        case ACTION.USER_RESPONSE: {
            return {
                ...state,
                token: action.token,
                user: action.user,
                isFetching: false,
                error: null,
            };
        }

        case ACTION.USER_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetching: false,
            };
        }

        case ACTION.USER_LOGOUT: {
            return {
                ...state,
                error: null,
                isFetching: false,
                token: null,
                user: null,
            }
        }
        case ACTION.EDIT_PROFILE_REQUEST: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case ACTION.EDIT_PROFILE_RESPONSE: {
            return {
                ...state,
                user: {...state.user, ...action.data},
                isFetching: false,
                editError: null
            };
        }

        case ACTION.EDIT_PROFILE_ERROR: {
            return {
                ...state,
                editError: action.error,
                isFetching: false,
            };
        }

        default: {
            return state;
        }
    }
}

