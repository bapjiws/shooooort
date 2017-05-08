import axios from 'axios';

import {
    ADD_LINKS_DATA_ENTRY_SUCCESS,
    ADD_LINKS_DATA_ENTRY_FAILURE,
    UPDATE_LINKS_DATA_SUCCESS,
    UPDATE_LINKS_DATA_FAILURE,
    CLEAR_LINKS_DATA
} from '../actions/types';

export const addShortcodeSuccess = (shortcode, data) => ({type: ADD_LINKS_DATA_ENTRY_SUCCESS, shortcode, data});
export const addShortcodeFailure = error => ({type: ADD_LINKS_DATA_ENTRY_FAILURE, error});

export const shortenLink = url => {
    return (dispatch, getState, { axiosInstance }) => {
        axiosInstance({
            method: 'post',
            url: '/shorten',
            data: { url }
        })
            .then(response => {
                console.log('response.data:', response.data);

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

export const fetchLinksInfo = () => {
    return (dispatch, getState, { axiosInstance }) => {
        const linksData = getState().linksData.data;

        const data = {};
        axios.all(Object.keys(linksData).map(key => axiosInstance({
            method: 'get',
            url: `/${key}/stats`
        })))
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
                dispatch(updateLinksDataSuccess(data));
            })
            .catch(error => dispatch(updateLinksDataFailure(error)));
    }
};

export const updateLinksDataSuccess = data => ({type: UPDATE_LINKS_DATA_SUCCESS, data});
export const updateLinksDataFailure = error => ({type: UPDATE_LINKS_DATA_FAILURE, error});

export const clearHistory = () => ({type: CLEAR_LINKS_DATA});