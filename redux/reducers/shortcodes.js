import {
    ADD_SHORTCODE_SUCCESS,
    ADD_SHORTCODE_FAILURE,
    CLEAR_HISTORY
} from '../actions/types';

const initialState = {
    list: [],
    error: null
};

// TODO: test for purity with deep freeze.
const shortcodeReducer = (state = initialState, action) => {
    const { type, data, error } = action;

    switch (type) {

        case ADD_SHORTCODE_SUCCESS:
            // let newData = state.data; // TODO: most likely need { ...state.data }, test it.
            // newData[shortcode] = { url };
            return {
                list: [...state.list, data],
                error: null
            };

        case ADD_SHORTCODE_FAILURE:
            return {
                ...state,
                error
            };

        case CLEAR_HISTORY:
            return initialState;

        default:
            return state;
    }

};

export default shortcodeReducer;