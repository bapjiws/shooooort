import nock from 'nock';

import { ajax } from 'rxjs/observable/dom/ajax';
import { map } from 'rxjs/add/operator/map';
import { mergeMap } from 'rxjs/add/operator/mergeMap';

import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';

import { ActionsObservable } from 'redux-observable'

import { combineReducers } from 'redux';

const host = 'http://localhost';

const FETCH_USER = 'FETCH_USER';
const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';

// action creators
const fetchUser = username => ({ type: FETCH_USER, payload: username });
const fetchUserFulfilled = payload => ({ type: FETCH_USER_FULFILLED, payload });

// epic
const fetchUserEpic = action$ =>
    action$.ofType(FETCH_USER)
        .mergeMap(action =>
            ajax.getJSON('/api/users/123') //`https://api.github.com/users/${action.payload}`)
                .map(response => {
                    console.log('RESPONSE:', response);
                    return fetchUserFulfilled(response);
                })
        );

const users = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_FULFILLED:
            return {
                ...state,
                // `login` is the username
                [action.payload.login]: action.payload
            };

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    users
});

const epicMiddleware = createEpicMiddleware(fetchUserEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('fetchUserEpic', () => {
    let store;

    beforeEach(() => {
        nock.disableNetConnect();
        nock.enableNetConnect(host);

        store = mockStore({
            users: {}
        });
    });

    afterEach(() => {
        nock.cleanAll();
        epicMiddleware.replaceEpic(fetchUserEpic);
    });

    it('produces the user model', () => {
        const payload = { id: 123 };
        nock(host)
            .get('/api/users/123')
            .reply(200, payload);

        // store.dispatch({ type: FETCH_USER });
        //
        // expect(store.getActions()).toEqual([
        //     { type: FETCH_USER },
        //     { type: FETCH_USER_FULFILLED, payload }
        // ]);

        const actions$ = ActionsObservable.of(fetchUser('someUserName'));
        return fetchUserEpic(actions$).toPromise()
            .then((actionReceived) => {console.log('actionReceived:', actionReceived)})
    });
});