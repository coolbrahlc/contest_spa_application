import ACTION from '../actions/actiontsTypes';


const initialState = {
    isFetching: true,
    isFetchingUser: true,
    error: null,
    contestFormData: null

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
            console.log('getting array', action.contestsToInsert)
            return {
                ...state,
                contestsToInsert: action.contestsToInsert,
            }
        }

        case ACTION.FORM_DATA_SET: {
            return {
                ...state,
                contestFormData: action.contestFormData
            }
        }
        case ACTION.FORM_DATA_CLEAR: {
            return {
                ...state,
                contestFormData: null
            }
        }
        default: {
            return state;
        }
    }
}