import axios from 'axios';

import {
    ADD_SHORTCODE_SUCCESS,
    ADD_SHORTCODE_FAILURE,
    UPDATE_LINKS_INFO,
    CLEAR_HISTORY
} from '../actions/types';

// Our proxy server -- mimics all the routes exactly so that it can be substituted w/ a CORS-supporting server.
axios.defaults.baseURL = process.env.PROXY;

axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const addShortcodeSuccess = data => ({type: ADD_SHORTCODE_SUCCESS, data});
export const addShortcodeFailure = error => ({type: ADD_SHORTCODE_FAILURE, error});

export const shortenLink = url => {
    // TODO: will need to pass an instance of axios as a third argument if we have several action files.
    return (dispatch, getState) => { // , { axios }
        axios({
            method: 'post',
            url: '/shorten',
            data: { url }
        })
            .then(response => dispatch(addShortcodeSuccess({
                shortcode: response.data.shortcode,
                url,
                startDate: new Date(),
                lastSeenDate: new Date(),
                redirectCount: 0
            })))
            .catch(error => dispatch(addShortcodeFailure(error)));
    }
};

export const getShortcodeStats = shortcode => {
    return axios({
        method: 'get',
        url: `/${shortcode}/stats`
    })
};

export const fetchLinksInfo = () => {
    return (dispatch, getState) => {
        // TODO: store shortcodes as a list and links w/ shorcodes as their IDs.
        const shortcodes = getState().shortcodes.list.map(item => item.shortcode);
        console.log(shortcodes);

        axios.all(shortcodes.map(shortcode => getShortcodeStats(shortcode)) )
            .then(response => dispatch(updateLinksInfo(response.map(responseItem => responseItem.data))));

    }
};

// TODO: implement and handle UPDATE_LINKS_INFO_FAILURE action
export const updateLinksInfo = data => ({type: UPDATE_LINKS_INFO, data});

export const clearHistory = () => ({type: CLEAR_HISTORY});