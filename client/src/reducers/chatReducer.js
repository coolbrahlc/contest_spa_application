import ACTION from '../actions/actiontsTypes';

const initialState = {
    messages: [],
    participants: [],
    chats: [],
    myChat: null,
    isFetchingChat: false,
    isFetchingMyChats: true,
    error: null,
    //opponent: null,
    isOpened: false,
    isExpanded: false,
    haveMore: false,
    onlineUsers:[]
};

export default function (state = initialState, action) {
    switch (action.type) {

        case ACTION.GET_MESSAGE: {
            const { roomId, message, updated } = action.data;
            let chats = [...state.chats];
            const index = chats.findIndex(chat => chat._id === roomId);
            if (index>-1) {
                chats[index].lastMessage = message;
            } else {
                chats = chats.concat(updated)
            }
            return {
                ...state,
                messages: state.messages.concat(message),
                chats,
            };
        }

        case ACTION.CREATE_CHAT_REQUEST: {
            return {
                ...state,
                isFetchingChat: true,
            };
        }

        case ACTION.CHAT_ONLINE_USERS: {
            return {
                ...state,
                onlineUsers: action.data,
            };
        }
        case ACTION.CHAT_LIST_OFFLINE: {
            const onlineUsers = [...state.onlineUsers];
            const index = onlineUsers.indexOf(action.id);
            if (index > -1) onlineUsers.splice(index, 1);
            return {
                ...state,
                onlineUsers: onlineUsers,
            };
        }
        case ACTION.CHAT_LIST_ONLINE: {
            return {
                ...state,
                onlineUsers: state.onlineUsers.concat(action.id),
            };
        }

        case ACTION.CHAT_LOAD_MORE_RESPONSE: {
            console.log('get MORE msg', action.data);
            const { messages, haveMore } = action.data;
            return {
                ...state,
                messages: messages.concat(state.messages),
                haveMore
            };
        }

        case ACTION.CREATE_CHAT_RESPONSE: {
            const { messages, participants, haveMore } = action.data;
            return {
                ...state,
                myChat: action.data,
                messages: messages.concat(state.messages),
                isExpanded: true,
                participants: participants,
                //opponent: opponent,
                isFetchingChat: false,
                isOpened: true,
                haveMore
            };
        }
        case ACTION.CLOSE_CHAT: {
            return {
                ...state,
                myChat: null,
                messages: [],
                isExpanded: false,
                participants: [],
                //opponent: null,
            }
        }

        case ACTION.CREATE_CHAT_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetchingChat: false,
            };
        }

        case ACTION.LIST_CHATS_REQUEST: {
            return {
                ...state,
                isFetchingMyChats: true,
            };
        }

        case ACTION.LIST_CHATS_RESPONSE: {
            return {
                ...state,
                chats: action.data,
                isFetchingMyChats: false,
            };
        }

        case ACTION.LIST_CHATS_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetchingMyChats: false,
            };
        }

        case ACTION.TOGGLE_CHAT: {
            return {
                ...state,
                isOpened: !state.isOpened,
                isExpanded: false
            }
        }

        case ACTION.HIDE_CHAT: {
            return {
                ...state,
                isOpened: false
            }
        }

        default: {
            return state;
        }
    }
}

