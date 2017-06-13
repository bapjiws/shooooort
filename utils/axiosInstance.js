import axios from 'axios';

export const getAxiosInstance = () => {
    return axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? process.env.APP_URL : process.env.PROXY,
        headers: {'Content-Type': 'application/json'}
    });
};