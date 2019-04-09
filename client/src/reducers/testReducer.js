import ACTION from '../actions/actiontsTypes';


const initialState = {
    users: [],
    isFetching: false,
    isFetchingUser: false,
    error: null,
    user: {},
    contestsToInsert: false,
    contestFormData: false,
    selects: false
};

export default function (state=initialState, action) {
    switch (action.type) {

        case ACTION.SET_SELECTS: {
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
                //contestFormData: state.contestFormData.concat
                contestFormData: action.data
            }
        }


        default: {
            return state;
        }
    }
}