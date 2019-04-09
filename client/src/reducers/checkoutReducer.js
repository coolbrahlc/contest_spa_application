import ACTION from '../actions/actiontsTypes';

const initialState = {
    isFetching: false,
    error: null,
    success: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CHECKOUT_REQUEST: {
            return {
                isFetching: true,
                error: null,
                success: true
            }
        }
        case ACTION.CHECKOUT_RESPONSE: {
            return {
                isFetching: false,
                error: false,
                success: true
            }
        }
        case ACTION.CHECKOUT_ERROR: {
            return {
                isFetching: false,
                error: action.error,
                success: false
            }
        }
        default :
            return state;
    }
}
