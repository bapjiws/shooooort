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
                const id = response.data.id.replace(/https?\:\/\/goo\.gl\//g, ''); // TODO: extract into utils
                data[id] = {
                    url,
                    startDate: new Date(),
                    lastSeenDate: new Date(),
                    redirectCount: 0
                };
                dispatch(addShortcodeSuccess(id, data));
            })
            .catch(error => dispatch(addShortcodeFailure(error)));
    }
};

export const fetchLinksInfo = () => {
    return (dispatch, getState, { axiosInstance }) => {
        const linksData = getState().linksData.data;

        const data = {}; // TODO: const data = { ...linksData };
        axios.all(Object.keys(linksData).map(key => axiosInstance({
            method: 'get',
            url: `/${key}/stats`
        })))
            .then(response => {
                response.forEach(responseItem => {
                    const id = responseItem.data.id.replace(/https?\:\/\/goo\.gl\//g, ''); // TODO: extract into utils

                    data[id] = {
                        ...linksData[id],
                        redirectCount: responseItem.data.analytics.allTime.shortUrlClicks,
                        lastSeenDate: responseItem.data.analytics.allTime.shortUrlClicks !== linksData[id].redirectCount ? new Date() : linksData[id].lastSeenDate
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