import axios from 'axios';

import {
    ADD_SHORTCODE_SUCCESS,
    ADD_SHORTCODE_FAILURE
} from '../actions/types';

// Our proxy server -- mimics all the routes exactly so that it can be substituted w/ a CORS-supporting server.
axios.defaults.baseURL = process.env.PROXY;

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getShortcodeStats = shortcode => {
    axios({
        method: 'get',
        url: `/${shortcode}/stats`
    })
        .then(response => console.log('response:', response))
        .catch(error => console.log('error:', error))
};

export const shortenLink = url => {
    // TODO: will need to pass an instance of axios as a third argument if we have several action files.
    return (dispatch, getState) => { // , { axios }
        axios({
            method: 'post',
            url: '/shorten',
            data: { url }
        })
            .then(response => dispatch(addShortcodeSuccess(response.data.shortcode)))
            .catch(error => dispatch(addShortcodeFailure(error)));
    }
};

export const addShortcodeSuccess = shortcode => ({type: ADD_SHORTCODE_SUCCESS, shortcode});
export const addShortcodeFailure = error => ({type: ADD_SHORTCODE_FAILURE, error});