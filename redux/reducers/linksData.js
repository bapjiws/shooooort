import {
    ADD_SHORTCODE_SUCCESS,
    ADD_SHORTCODE_FAILURE,
    UPDATE_LINKS_INFO,
    CLEAR_HISTORY
} from '../actions/types';

const initialState = {
    // TODO: probably makes sense to store shortcodes' list to avoid using Object.keys(linksData).map, but that would mean storing and managing duplicate data.
    data: {},
    error: null
};

// TODO: test for purity with deep freeze.
const linksDataReducer = (state = initialState, action) => {
    const { type, shortcode, data, error } = action;

    /*
    data always looks like this: {
        shortcode: {
             url,
             startDate,
             lastSeenDate,
             redirectCount
        }
    }
    */

    switch (type) {

        case ADD_SHORTCODE_SUCCESS:
            const newData = { ...state.data };
            newData[shortcode] = data[shortcode];
            return {
                data: newData,
                error: null
            };

        case ADD_SHORTCODE_FAILURE:
            return {
                ...state,
                error
            };

        case UPDATE_LINKS_INFO:
            return {
                data: data,
                error: null
            };

        case CLEAR_HISTORY:
            return initialState;

        default:
            return state;
    }

};

export default linksDataReducer;