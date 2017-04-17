import { combineReducers } from 'redux';
import shortcodeReducer from './shortcodes';

const rootReducer = combineReducers({
    shortcodes: shortcodeReducer
});

export default rootReducer