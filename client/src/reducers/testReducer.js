import ACTION from '../actions/actiontsTypes';


const initialState = {
    isFetching: true,
    isFetchingUser: true,
    error: null,
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
            console.log(state.contestsToInsert, 'from reducer');
            return {
                ...state,
                contestFormData: action.data
            }
        }


        default: {
            return state;
        }
    }
}