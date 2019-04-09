import axios from 'axios'
const baseUrl =  "http://localhost:3000";

export const getAllUsers = () => {
    return axios.get(`${baseUrl}/users`);
};

export const getUserProfile = (id) => {
    return axios.get(    `${baseUrl}/users/${id}`);
};

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


export const getAllContests = (data) => {
    return axios.post(`${baseUrl}/contests/`, data, {});
};



