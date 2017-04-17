import { combineReducers } from 'redux';
import linksDataReducer from './linksData';

const rootReducer = combineReducers({
    linksData: linksDataReducer
});

export default rootReducer