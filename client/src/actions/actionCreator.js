import ACTION from './actiontsTypes';


export const setContestOrder = (arr) => {
  return {
    type: ACTION.SET_ARRAY_ORDER,
    arr
  };
};

export const collectFormData = (data) => {
  return {
    type: ACTION.COLLECT_FORM_DATA,
    data
  };
};


export const dataClear = () => {
    return {
        type: ACTION.FORM_DATA_CLEAR,
    };
};

export const getSelects = () => {
  return {
    type: ACTION.GET_SELECTS
  };
};

export const register = (data) => ({
  type: ACTION.USER_REGISTER,
  data
});

export const login = (data) => ({
  type: ACTION.USER_LOGIN,
  data
});

export const logout = (id) => ({
  type: ACTION.USER_LOGOUT_REQUEST,
  id
});

export const auth = () => ({
  type: ACTION.USER_AUTH,
});

export const clean = () => ({
  type: ACTION.USER_CLEAN,

});

export const checkout = (data) => {
  return {
    type: ACTION.CHECKOUT,
    data
  }
};

export const getContestById = (data) => {
  return {
    type: ACTION.GET_CONTEST_BY_ID,
    data
  }
};

export const getCustomerContests = (data) => {
  return {
    type: ACTION.GET_CUSTOMER_CONTESTS,
    data
  }
};
export const getFilteredContests = (data) => {
  return {
    type: ACTION.GET_FILTERED_CONTESTS,
    data
  }
};

export const updateContest = (data) => ({
  type: ACTION.UPDATE_CONTEST,
  data
});

export const setEntryWinner = (data) => ({
  type: ACTION.SET_ENTRY_WINNER,
  data,
});

export const rejectEntry = (data) => ({
  type: ACTION.REJECT_ENTRY,
  data,
});

export const createEntry = (data) => ({
  type: ACTION.CREATE_ENTRY,
  data
});

export const editUser = (data) => ({
  type: ACTION.EDIT_USER_PROFILE,
  data
});

export const creativeCheckout = (data) => ({
  type: ACTION.CREATIVE_CHECKOUT,
  data
});

export const getMore = (data) => ({
  type: ACTION.GET_MORE_CONTESTS,
  data
});

export const sendMessage = (data) => ({
  type: ACTION.SEND_MESSAGE,
  data
});

export const startConversation = (data) => ({
  type: ACTION.CREATE_CHAT,
  data
});

export const loadMoreChat = (data) => ({
  type: ACTION.CHAT_LOAD_MORE,
  data
});

export const listMyChats = (data) => ({
  type: ACTION.LIST_CHATS,
  data
});

export const toggleChat = (data) => ({
  type: ACTION.TOGGLE_CHAT,
  data
});

export const hideChat = (data) => ({
  type: ACTION.HIDE_CHAT,
  data
});

export const closeChat = (data) => ({
  type: ACTION.CLOSE_CHAT,
  data
});

export const listEntries = (data) => ({
  type: ACTION.LIST_ENTRIES,
  data
});

export const changeStatus = (data) => ({
  type: ACTION.CHANGE_ENTRY_STATUS_MODER,
  data
});


// export const userProfileError = (error) => ({
//   type: ACTION.EDIT_PROFILE_ERROR,
//   error
// });
//
// export const cleanError = (error) => ({
//   type: ACTION.USER_CLEAN,
//   error
// });
