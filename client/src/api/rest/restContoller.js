import axios from 'axios'
import {baseURL} from '../baseURL'

export const getAllSelects = () => {
    return axios.get(`${baseURL}/selects`);
};

export const register = (data) => axios.post(`${baseURL}/register`, data);

export const login = (data) => axios.post(`${baseURL}/login`, data);

export const token = () => {
    return axios.post(`${baseURL}/token`, {} , {/* headers: {Authorization: data}*/})
};
export const editProfile = (data) => {
    return axios.put(`${baseURL}/user/`, data);
};

export const checkout = (data) => {
    return axios.post(`${baseURL}/contests/create`, data.data);
};

export const getCustomerContests = (data) => {
    return axios.post(`${baseURL}/contests/`, data);
};

export const getContestById = (data) => {
    return axios.get(`${baseURL}/contests/${data.id}`, {
    });
};

export const updateContest = (data) => {
    return axios.put(`${baseURL}/contests/${data.id}`, data.data);
};

export const setEntryWinner = (data) => {
    return axios.put(`${baseURL}/entry/winner`, data);
};

export const rejectEntry = (data) => {
    return axios.put(`${baseURL}/entry/reject`, data);
};

export const createEntry = (data) => {
    return axios.post(`${baseURL}/entry/create`, data);
};

export const creativeCheckout = (data) => {
    return axios.post(`${baseURL}/user/checkout`, data);
};

export const sendMessage = (data) => {
    return axios.post(`${baseURL}/message/create`, data);
};

export const startConversation = (data) => {
    return axios.post(`${baseURL}/conversation/start`, data);
};

export const listMyChats = (data) => {
    return axios.post(`${baseURL}/conversation/list`, data);
};

export const listEntries = (data) => {
    return axios.get(`${baseURL}/entry/all`, data);
};

export const moderChangeStatusEntry = (data) => {
    return axios.put(`${baseURL}/moderator/status`, data);
};

