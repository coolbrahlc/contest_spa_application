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
        // case ACTION.USERS_REQUEST: {
        //     return {
        //         ...state,
        //         isFetching: true,
        //         error: null
        //     }
        // }
        //
        // case ACTION.USERS_RESPONSE: {
        //     return {
        //         ...state,
        //         users: action.users,
        //         isFetching: false,
        //         error: null
        //     }
        // }

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

        // case ACTION.USERS_ERROR: {
        //     return {
        //         ...state,
        //         error: action.error,
        //         isFetching: false
        //
        //     }
        // }
        //
        //
        // case ACTION.USER_PROFILE_REQUEST: {
        //     return {
        //         ...state,
        //         error: null,
        //         isFetchingUser: true
        //
        //     }
        // }
        //
        // case ACTION.USER_PROFILE_RESPONSE: {
        //     return {
        //         ...state,
        //         user: action.user,
        //         error: null,
        //         isFetchingUser: false
        //
        //     }
        // }
        //
        // case ACTION.USER_ERROR: {
        //     return {
        //         ...state,
        //         error: action.error,
        //         isFetchingUser: false
        //
        //     }
        // }

        default: {
            return state;
        }
    }
}