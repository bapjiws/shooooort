import axios from 'axios';
import { ajax } from 'rxjs/observable/dom/ajax';
import { map } from 'rxjs/add/operator/map';
import { mergeMap } from 'rxjs/add/operator/mergeMap';
import { forkJoin } from 'rxjs/observable/forkJoin';
// https://github.com/ReactiveX/rxjs#installation-and-usage
// import Rx from 'rxjs/Rx';

/*import 'rxjs/add/operator/switchMap';
action$.ofType(...).switchMap(...);

// OR

import { switchMap } from 'rxjs/operator/switchMap';
action$.ofType(...)::switchMap(...);*/

import {
    ADD_LINKS_DATA_ENTRY,
    ADD_LINKS_DATA_ENTRY_SUCCESS,
    ADD_LINKS_DATA_ENTRY_FAILURE,
    UPDATE_LINKS_DATA,
    UPDATE_LINKS_DATA_SUCCESS,
    UPDATE_LINKS_DATA_FAILURE,
    CLEAR_LINKS_DATA
} from '../actions/types';

import { responseDataIdToId } from '../../utils/extractId';

export const addShortcode = url => ({type: ADD_LINKS_DATA_ENTRY, url});
export const addShortcodeSuccess = (shortcode, data) => ({type: ADD_LINKS_DATA_ENTRY_SUCCESS, shortcode, data});
export const addShortcodeFailure = error => ({type: ADD_LINKS_DATA_ENTRY_FAILURE, error});

export const shortenLink = url => {
    return (dispatch, getState, { axiosInstance }) => {
        return axiosInstance({
            method: 'post',
            url: '/shorten',
            data: { url }
        })
            .then(response => {
                console.log('response:', response.data);

                let data = {};
                const id = responseDataIdToId(response.data.id);
                data[id] = {
                    url,
                    startDate: new Date(),
                    lastVisited: new Date(),
                    visits: 0
                };
                dispatch(addShortcodeSuccess(id, data));

                return Promise.resolve();
            })
            .catch(error => dispatch(addShortcodeFailure(error)));
    }
};

export const shortenLinkRxjs = (action$, store) =>
    action$.ofType(ADD_LINKS_DATA_ENTRY)
        .mergeMap(action => {
            console.log('ACTION:', action);
            return ajax.post('/shorten', { url: action.url }, { 'Content-Type': 'application/json' })
                .map(response => {
                    console.log('response:', response);

                    const { id: unparsedId, longUrl: url } = response.response;
                    const parsedId = responseDataIdToId(unparsedId);

                    let data = {};
                    data[responseDataIdToId(parsedId)] = {
                        url,
                        startDate: new Date(),
                        lastVisited: new Date(),
                        visits: 0
                    };

                    return addShortcodeSuccess(parsedId, data);
                })
        });

export const fetchLinksInfo = () => {
    return (dispatch, getState, { axiosInstance }) => {
        console.log('fetchLinksInfo');

        const linksData = getState().linksData.data;

        const data = {};
        axios.all(Object.keys(linksData).map(key => axiosInstance({
            method: 'get',
            url: `/${key}/stats`
        })))
            .then(response => {
                console.log('response:', response);

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

export const fetchLinksInfoRxjs = (action$, store) =>
    action$.ofType(UPDATE_LINKS_DATA)
    .mergeMap(action => {
        console.log('ACTION:', action);
        console.log('store.getState().linksData.data:', store.getState().linksData.data);

        return forkJoin(Object.keys(store.getState().linksData.data).map(key => {
            console.log('KEY:', key);
            return ajax.getJSON(`/${key}/stats`)
        }))
    })
    .map(response => {
        console.log('RESPONSE:', response);

        const linksData = store.getState().linksData.data;
        let data = {};
        response.forEach(responseItem => {
            const id = responseDataIdToId(responseItem.id);

            data[id] = {
                ...linksData[id],
                visits: responseItem.analytics.allTime.shortUrlClicks,
                lastVisited: responseItem.analytics.allTime.shortUrlClicks !== linksData[id].visits ? new Date() : linksData[id].lastVisited
            };
        });

        return updateLinksDataSuccess(data);
    });

// TODO: rename all this stuff into fetchLinksSomething
export const updateLinks = () => ({type: UPDATE_LINKS_DATA});
export const updateLinksDataSuccess = data => ({type: UPDATE_LINKS_DATA_SUCCESS, data});
export const updateLinksDataFailure = error => ({type: UPDATE_LINKS_DATA_FAILURE, error});

export const clearHistory = () => ({type: CLEAR_LINKS_DATA});