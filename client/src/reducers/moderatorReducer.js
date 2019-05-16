import ACTION from '../actions/actiontsTypes';

const initialState = {
    isFetching: false,
    error: null,
    entries: [],
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.LIST_ENTRIES_REQUEST: {
            return {
                ...state,
                isFetching: true,
            }
        }

        case ACTION.LIST_ENTRIES_RESPONSE: {
            return {
                ...state,
                isFetching: false,
                error: null,
                entries: action.data,
            }
        }
        case ACTION.CONFIRM_ENTRY_RESPONSE: {
            console.log(action.data.id);
            const entries = state.entries;
            const index = entries.findIndex(e => e.id === action.data.id);
            console.log(index);
            entries[index].moderation_status = action.data.status;
            console.log(entries);
            return {
                ...state,
                entries: [...entries],
            }
        }

        case ACTION.LIST_ENTRIES_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
            }
        }
        default:
            return state;
    }
}
