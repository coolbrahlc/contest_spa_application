import ACTION from '../actions/actiontsTypes';

const initialState = {
    isFetching: false,
    error: null,
    token: null,
    id: null,
    role: "",
    user: null,
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
                id: action.id,
                role: action.role,
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
                id: null,
                user: null,
                role: ""
            }
        }
        default: {
            return state;
        }
    }
}

