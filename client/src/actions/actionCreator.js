import ACTION from './actiontsTypes';


export const setContestOrder = (arr) => {
  return {
    type: ACTION.SET_ARRAY_ORDER,
    arr: arr
  };
};

export const collectFormData = (formData) => {
  return {
    type: ACTION.COLLECT_FORM_DATA,
    data: formData
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

export const logout = () => ({
  type: ACTION.USER_LOGOUT
});


export const auth = (data) => ({
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

