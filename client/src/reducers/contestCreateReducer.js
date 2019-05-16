import ACTION from '../actions/actiontsTypes';


const initialState = {
    isFetching: true,
    error: null,
    contestFormData: null,
    success: null,
};

export default function (state=initialState, action) {
    switch (action.type) {

        case ACTION.GET_SELECTS_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }

        case ACTION.GET_SELECTS_RESPONSE: {
            return {
                ...state,
                selects: action.selects,
                isFetching: false,
                error: null
            }
        }

        case ACTION.API_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        }

        case ACTION.GET_ARRAY_ORDER: {
            return {
                ...state,
                contestsToInsert: action.contestsToInsert,
            }
        }

        case ACTION.COLLECT_FORM_DATA: {
            return {
                ...state,
                contestFormData: action.data
            }
        }
        case ACTION.FORM_DATA_CLEAR: {
            return {
                ...state,
                contestFormData: null,
                success: null,
                error: null,
            }
        }

        case ACTION.CHECKOUT_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
            }
        }
        case ACTION.CHECKOUT_RESPONSE: {
            return {
                ...state,
                isFetching: false,
                error: null,
                success: true,
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
        default: {
            return state;
        }
    }
}
