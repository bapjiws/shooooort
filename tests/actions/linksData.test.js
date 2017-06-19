import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import sinon from 'sinon';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

import {
    ADD_LINKS_DATA_ENTRY_SUCCESS
} from '../../redux/actions/types';
import { shortenLink } from '../../redux/actions/linksData';

const host = 'http://localhost';

const axiosInstance = axios.create();
axiosInstance.defaults.host = host;
axiosInstance.defaults.adapter = httpAdapter;

const middlewares = [ thunk.withExtraArgument({ axiosInstance }) ];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
    linksData: {
        data: {},
        error: null
    }
});

test('Create ADD_LINKS_DATA_ENTRY_SUCCESS when shortening a link has succeeded', async () => {
    // Lock time so that new Date() in mock action and in shortenLink yield exactly the same time
    let clock = sinon.useFakeTimers(); // TODO: Use Jest timer mock: https://facebook.github.io/jest/docs/en/timer-mocks.html#content

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
    expect(store.getActions()).toEqual(expectedActions);
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
