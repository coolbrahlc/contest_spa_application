import ACTION from '../actions/actiontsTypes';


const initialState = {
    isFetching: true,
    isFetchingContest: true,
    error: null,
    contests: null,
    contest: null,
    editMode: false,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_CUSTOMER_CONTESTS_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
                contests: null,
                editMode: true,
            }
        }
        case ACTION.GET_CUSTOMER_CONTESTS_RESPONSE: {
            return {
                ...state,
                isFetching: false,
                error: null,
                contests: action.data,
                editMode: false,

            }
        }
        case ACTION.GET_CONTEST_BY_ID_REQUEST: {
            return {
                ...state,
                isFetchingContest: true,
                error: null,
                contest: null,
                editMode: false,

            }
        }

        case ACTION.GET_CONTEST_BY_ID_RESPONSE: {
            return {
                ...state,
                isFetchingContest: false,
                error: null,
                contest: action.data
            }
        }
        case ACTION.GET_CUSTOMER_CONTESTS_ERROR: {
            return {
                ...state,
                isFetching: false,
                isFetchingContest: false,
                error: action.error,
                contests: null,
                contest: null
            }
        }
        default:
            return state;
    }
}
