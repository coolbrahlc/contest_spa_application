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

export const token = (data) => {
    return axios.post(`${baseUrl}/token`, {} , {
        headers: {
            Authorization: data
        }
    })
};


export const checkout = (data) => {
    console.log(data.token);
    return axios.post(`${baseUrl}/contests/create`, data.data, {
        headers: {
            Authorization: data.token,
        }
    });
};

export const getCustomerContests = (data) => {
    return axios.post(`${baseUrl}/contests/`, data, {
        headers: {
            Authorization: data.token,
        }
    });
};

export const getContestById = (data) => {
    console.log(data, 'CONTEST BY ID');
    return axios.get(`${baseUrl}/contests/${data.id}`, {
        headers: {
            Authorization: data.token,
        }
    });
};


export const getAllContests = (data) => {
    return axios.post(`${baseUrl}/contests/`, data, {
        headers: {
            Authorization: data.token,
        }
    });
};



