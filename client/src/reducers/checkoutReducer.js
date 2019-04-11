import ACTION from '../actions/actiontsTypes';

const initialState = {
    isFetching: false,
    error: null,
    success: null,
    contestFormData: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CHECKOUT_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
                contestFormData: null
            }
        }
        case ACTION.CHECKOUT_RESPONSE: {
            return {
                ...state,
                isFetching: false,
                error: false,
                success: true,
                contestFormData: null
            }
        }
        case ACTION.CHECKOUT_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
                success: false
            }
        }
        default :
            return state;
    }
}
