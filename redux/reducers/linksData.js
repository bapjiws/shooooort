import {
    ADD_LINKS_DATA_ENTRY_SUCCESS,
    ADD_LINKS_DATA_ENTRY_FAILURE,
    UPDATE_LINKS_DATA_SUCCESS,
    UPDATE_LINKS_DATA_FAILURE,
    CLEAR_LINKS_DATA
} from '../actions/types';

const initialState = {
    // TODO: probably makes sense to store shortcodes' list to avoid using Object.keys(linksData).map, but that would mean storing and managing duplicate data.
    data: {},
    error: null
};

const linksDataReducer = (state = initialState, action) => {
    const { type, shortcode, data, error } = action;

    /*
    data should always look like this: {
        shortcode: {
             url,
             startDate,
             lastVisited,
             visits
        }
    }
    */

    switch (type) {

        case ADD_LINKS_DATA_ENTRY_SUCCESS:
            const newData = { ...state.data };
            newData[shortcode] = data[shortcode];
            return {
                data: newData,
                error: null
            };

        case ADD_LINKS_DATA_ENTRY_FAILURE:
            return {
                ...state,
                error
            };

        case UPDATE_LINKS_DATA_SUCCESS:
            return {
                data: data,
                error: null
            };

        case UPDATE_LINKS_DATA_FAILURE:
            return {
                ...state,
                error
            };

        case CLEAR_LINKS_DATA:
            return initialState;

        default:
            return state;
    }

};

export default linksDataReducer;