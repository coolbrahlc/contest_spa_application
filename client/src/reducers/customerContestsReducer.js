import ACTION from '../actions/actiontsTypes';
import {ENTRY_WINNER, ENTRY_REJECTED} from '../constants/constants'

const initialState = {
    isFetching: true,
    isFetchingContest: true,
    error: null,
    contests: null,
    contest: null,
    entries: [],
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
                editMode: false,
            }
        }

        case ACTION.GET_CONTEST_BY_ID_RESPONSE: {
            console.log('getting by ID');
            return {
                ...state,
                isFetchingContest: false,
                contest: action.data,
                entries: action.data.Suggestions
            }
        }

        case ACTION.UPDATE_CONTEST_RESPONSE: {
            return {
                ...state,
                isFetchingContest: false,
                contest: {...state.contest, ...action.data}
            }
        }


        case ACTION.GET_CUSTOMER_CONTESTS_ERROR: {
            return {
                ...state,
                isFetching: false,
                isFetchingContest: false,
                error: action.error,
                //contests: null,
                contest: null
            }
        }

        case ACTION.ENTRY_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        }

        case ACTION.ENTRY_CREATE_RESPONSE: {
            console.log(545454)
            console.log(state.entries)
            console.log(action.action)

            return {
                ...state,
                isFetching: false,
                entries: state.entries.concat(action.data),
            };
        }

        case ACTION.ENTRY_WIN_RESPONSE: {
            const contest= state.contest;
            contest.is_active = false;
            let entries = state.entries;
            entries = entries.map(e => {
                e.status = ENTRY_REJECTED;
                return e
            });
            const index = entries.findIndex(e => e.id === action.data.id);
            entries[index].status = ENTRY_WINNER;
            return {
                ...state,
                isFetching: false,
                error: null,
                entries: [...entries],
                contest: {...contest}
            };
        }
        case ACTION.ENTRY_REJECT_RESPONSE: {
            const entries = state.entries;
            const index = entries.findIndex(e => e.id === action.data.id);
            entries[index].status = ENTRY_REJECTED;
            return {
                ...state,
                isFetching: false,
                error: null,
                entries: [...entries],
            };
        }
        case ACTION.ENTRY_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetching: false,
            };
        }
        default:
            return state;
    }
}
