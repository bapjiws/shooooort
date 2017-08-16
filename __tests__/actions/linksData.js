// On testing async actions in a different vein, see:
// https://medium.com/@iamcherta/testing-async-actions-on-redux-without-following-the-manual-87d7bd804fb8

import configureMockStore from 'redux-mock-store'; // http://arnaudbenard.com/redux-mock-store/
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

import { ActionsObservable } from 'redux-observable'

import {
    ADD_LINKS_DATA_ENTRY_SUCCESS
} from '../../redux/actions/types';
import { shortenLink, shortenLinkRxjs, addShortcode } from '../../redux/actions/linksData';

const host = 'http://localhost';

const axiosInstance = axios.create();
axiosInstance.defaults.host = host;
axiosInstance.defaults.adapter = httpAdapter;

const epicMiddleware = createEpicMiddleware(shortenLinkRxjs);
// const middlewares = [ thunk.withExtraArgument({ axiosInstance }), epicMiddleware ];
const mockStore = configureMockStore([ epicMiddleware ]);

const store = mockStore({
    linksData: {
        data: {},
        error: null
    }
});

describe('shortenLink', () => {
    it.skip('should create ADD_LINKS_DATA_ENTRY_SUCCESS w/ payload on success', async () => {
        // Lock time so that new Date() in mock action and in shortenLink yield exactly the same time
        global.Date = jest.fn();

        expect.assertions(1);

        nock(host)
            .post('/shorten', {
                url: 'http://test.com' // TODO: probably better to name the field longUrl?
            })
            .reply(200, {
                kind: 'urlshortener#url',
                id: 'https://goo.gl/2EMk',
                longUrl: 'http://test.com/'
            });

        const expectedActions = [
            {
                type: 'ADD_LINKS_DATA_ENTRY_SUCCESS',
                shortcode: '2EMk',
                data: {
                    '2EMk': {
                        url: 'http://test.com',
                        startDate: new Date(),
                        lastVisited: new Date(),
                        visits: 0
                    }
                }
            }
        ];

        await store.dispatch(shortenLink('http://test.com'));

        console.log('store:', store.getState());
        expect(store.getActions()).toEqual(expectedActions);
    });

    // https://stackoverflow.com/a/43188527/4134960
    // https://github.com/redux-observable/redux-observable/issues/144#issuecomment-269800559
    // https://github.com/redux-observable/redux-observable/issues/194#issuecomment-279799812
    // Probably: https://github.com/redux-observable/redux-observable/issues/76
    it('should emit ADD_LINKS_DATA_ENTRY_SUCCESS action with correct payload', () => {
        // Lock time so that new Date() in mock action and in shortenLink yield exactly the same time
        global.Date = jest.fn();

        // expect.assertions(1);

        nock(host)
            .post('/shorten')
            .reply(200, {
                kind: 'urlshortener#url',
                id: 'https://goo.gl/2EMk',
                longUrl: 'http://test.com/'
            });
        //
        // const expectedActions = [
        //     {
        //         type: 'ADD_LINKS_DATA_ENTRY',
        //         url: 'http://test.com'
        //     },
        //     {
        //         type: 'ADD_LINKS_DATA_ENTRY_SUCCESS',
        //         shortcode: '2EMk',
        //         data: {
        //             '2EMk': {
        //                 url: 'http://test.com',
        //                 startDate: new Date(),
        //                 lastVisited: new Date(),
        //                 visits: 0
        //             }
        //         }
        //     }
        // ];

        const expectedAction = {
            type: 'ADD_LINKS_DATA_ENTRY_SUCCESS',
            shortcode: '2EMk',
            data: {
                '2EMk': {
                    url: 'http://test.com',
                    startDate: new Date(),
                    lastVisited: new Date(),
                    visits: 0
                }
            }
        };
        const action$ = ActionsObservable.of(addShortcode('http://test.com'));
        const api = {
            postLink: (url = 'http://test.com') => Observable.of(expectedAction)
        };
        shortenLinkRxjs(action$, null, { api })
            // .toArray()
            // .toPromise()
            // .then(actionReceived => console.log(actionReceived))

            .toArray()
            .subscribe(actions => {
                console.log(actions);
            });
    });
});


// TODO: test fetchLinksInfo
// Example of response entry for fetchLinksInfo
// body: {
//     "kind": "urlshortener#url",
//         "id": "http://goo.gl/PaXgED",
//         "longUrl": "http://another.one/",
//         "status": "OK",
//         "analytics": {
//         "allTime": {
//             "shortUrlClicks": "1",
//                 "longUrlClicks": "1"
//         },
//         "month": {
//             "shortUrlClicks": "0",
//                 "longUrlClicks": "0"
//         },
//         "week": {
//             "shortUrlClicks": "0",
//                 "longUrlClicks": "0"
//         },
//         "day": {
//             "shortUrlClicks": "0",
//                 "longUrlClicks": "0"
//         },
//         "twoHours": {
//             "shortUrlClicks": "0",
//                 "longUrlClicks": "0"
//         }
//     }
// }
