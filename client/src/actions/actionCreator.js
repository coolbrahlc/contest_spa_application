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

export const getAllContests = () => ({
  type: ACTION.GET_ALL_CONTESTS
});

export const updateContest = (data) => ({
  type: ACTION.UPDATE_CONTEST,
  data
});
