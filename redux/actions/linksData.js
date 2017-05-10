import axios from 'axios';

import {
    ADD_LINKS_DATA_ENTRY_SUCCESS,
    ADD_LINKS_DATA_ENTRY_FAILURE,
    UPDATE_LINKS_DATA_SUCCESS,
    UPDATE_LINKS_DATA_FAILURE,
    CLEAR_LINKS_DATA
} from '../actions/types';

import { responseDataIdToId } from '../../utils/extractId';

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
                const id = responseDataIdToId(response.data.id); // TODO: extract into utils
                data[id] = {
                    url,
                    startDate: new Date(),
                    lastVisited: new Date(),
                    visits: 0
                };
                dispatch(addShortcodeSuccess(id, data));
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
                    const id = responseDataIdToId(responseItem.data.id);

                    data[id] = {
                        ...linksData[id],
                        visits: responseItem.data.analytics.allTime.shortUrlClicks,
                        lastVisited: responseItem.data.analytics.allTime.shortUrlClicks !== linksData[id].visits ? new Date() : linksData[id].lastVisited
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