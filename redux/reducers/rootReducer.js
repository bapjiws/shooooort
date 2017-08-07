import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import linksDataReducer from './linksData';
import { fetchLinksInfoRxjs } from '../actions/linksData';

export const rootReducer = combineReducers({
    linksData: linksDataReducer
});

export const rootEpic = combineEpics(
    fetchLinksInfoRxjs // TODO: amend
);