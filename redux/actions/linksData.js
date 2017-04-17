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

export const addShortcodeSuccess = (shortcode, data) => ({type: ADD_SHORTCODE_SUCCESS, shortcode, data});
export const addShortcodeFailure = error => ({type: ADD_SHORTCODE_FAILURE, error});

export const shortenLink = url => {
    // TODO: will need to pass an instance of axios as a third argument if we have several action files.
    return (dispatch, getState) => { // , { axios }
        axios({
            method: 'post',
            url: '/shorten',
            data: { url }
        })
            .then(response => {
                let data = {};
                data[response.data.shortcode] = {
                    url,
                    startDate: new Date(),
                    lastSeenDate: new Date(),
                    redirectCount: 0
                };
                dispatch(addShortcodeSuccess(response.data.shortcode, data));
            })
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
        const linksData = getState().linksData.data;

        const data = {};
        axios.all(Object.keys(linksData).map(key => getShortcodeStats(key)))
            .then(response => {

                response.forEach(responseItem => {
                    // Since the server does not return the shortcodes (i.e., our IDs) and we update the entire
                    // linksData.data state slice, we'll need to extract them from response.config.url pieces.
                    const shortcode = /.*\/([\d\w]+)\/stats$/g.exec(responseItem.config.url)[1];
                    data[shortcode] = {
                        url: linksData[shortcode].url,
                        ...responseItem.data
                    };
                });
                dispatch(updateLinksInfo(data));
            });
    }
};

// TODO: implement and handle UPDATE_LINKS_INFO_FAILURE action
export const updateLinksInfo = data => ({type: UPDATE_LINKS_INFO, data});

export const clearHistory = () => ({type: CLEAR_HISTORY});