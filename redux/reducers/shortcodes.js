import {
    ADD_SHORTCODE_SUCCESS,
    ADD_SHORTCODE_FAILURE
} from '../actions/types';

const initialState = {
    list: [], // TODO: store shortened URL to avoid GET request to /:shortcode
    error: null
};

// TODO: test for purity with deep freeze.
const shortcodeReducer = (state = initialState, action) => {
    const { type, shortcode, error } = action;

    switch (type) {

        case ADD_SHORTCODE_SUCCESS:
            return {
                ...state,
                list: [...state.list, shortcode],
                error: null
            };

        case ADD_SHORTCODE_FAILURE:
            return {
                ...state,
                error
            };

        default:
            return state;
    }

};

export default shortcodeReducer;