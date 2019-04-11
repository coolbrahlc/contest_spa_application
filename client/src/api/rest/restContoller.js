import axios from 'axios'
const baseUrl =  "http://localhost:3000";


export const getAllSelects = () => {
    return axios.get(`${baseUrl}/selects`);
};

export const register = (data) => axios.post(`${baseUrl}/register`, data);

export const login = (data) => axios.post(`${baseUrl}/login`, data);

export const token = () => {
    return axios.post(`${baseUrl}/token`, {} , {/* headers: {Authorization: data}*/})
};

export const checkout = (data) => {
    return axios.post(`${baseUrl}/contests/create`, data.data, {});
};

export const getCustomerContests = (data) => {
    return axios.post(`${baseUrl}/contests/`, data, {});
};

export const getContestById = (data) => {
    return axios.get(`${baseUrl}/contests/${data.id}`, {
    });
};

export const updateContest = (data) => {
    return axios.put(`${baseUrl}/contests/${data.id}`, data.data);
};

// export const getAllContests = (data) => {
//     return axios.post(`${baseUrl}/contests/`, data, {});
// };

export const setEntryWinner = (data) => {
    return axios.put(`${baseUrl}/entry/winner`, data);
};

export const rejectEntry = (id) => {
    console.log('from rest')
    console.log(id)
    return axios.put(`${baseUrl}/entry/reject`, {id: id});
};


