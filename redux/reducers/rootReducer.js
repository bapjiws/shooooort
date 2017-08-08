import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import linksDataReducer from './linksData';
import { shortenLinkRxjs, fetchLinksInfoRxjs } from '../actions/linksData';

export const rootReducer = combineReducers({
    linksData: linksDataReducer
});

export const rootEpic = combineEpics(
    shortenLinkRxjs,
    fetchLinksInfoRxjs // TODO: amend
);