import axios from 'axios';

export const getAxiosInstance = () => {
    return axios.create({
        // Our proxy server -- mimics all the routes exactly so that it can be substituted w/ a CORS-supporting server.
        baseURL: process.env.NODE_ENV === 'production' ? `${process.env.HEROKU_URL}:${process.env.PORT}` : process.env.PROXY,
        headers: {'Content-Type': 'application/json'}
    });
};