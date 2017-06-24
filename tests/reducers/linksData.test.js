import deepFreeze from 'deep-freeze';

import linksDataReducer from '../../redux/reducers/linksData';

import {
    ADD_LINKS_DATA_ENTRY_SUCCESS,
    ADD_LINKS_DATA_ENTRY_FAILURE,
    UPDATE_LINKS_DATA_SUCCESS,
    UPDATE_LINKS_DATA_FAILURE,
    CLEAR_LINKS_DATA
} from '../../redux/actions/types';

describe('linksDataReducer', () => {
    test('should add a new entry to the data object with stats on links', () => {
        const linksDataBefore = {
            data: {},
            error: null
        };
        const action = {
            type: ADD_LINKS_DATA_ENTRY_SUCCESS,
            shortcode: '918dbe',
            data: {
                '918dbe': {
                    url: 'http://example.com',
                    startDate: '2017-04-17T12:26:03.199Z',
                    lastVisited: '2017-04-17T12:26:03.199Z',
                    visits: 0
                }
            }
        };
        const linksDataAfter = {
            data: {
                '918dbe': {
                    url: 'http://example.com',
                    startDate: '2017-04-17T12:26:03.199Z',
                    lastVisited: '2017-04-17T12:26:03.199Z',
                    visits: 0
                }
            },
            error: null
        };

        expect(linksDataReducer(deepFreeze(linksDataBefore), deepFreeze(action))).toEqual(linksDataAfter);
    });

    test('should add an error to the data object with stats on links, otherwise leave it intact (2 actions)', () => {
        const linksDataBefore = {
            data: {
                '918dbe': {
                    url: 'http://example.com/1',
                    startDate: '2017-02-17T12:26:03.199Z',
                    lastVisited: '2017-02-17T12:26:03.199Z',
                    visits: 0
                },
                'e67b': {
                    url: 'http://example.com/3',
                    startDate: '2017-04-17T11:56:08.830Z',
                    lastVisited: '2017-04-17T13:17:50.871Z',
                    visits: 0
                }
            },
            error: null
        };
        const action_one = {
            type: ADD_LINKS_DATA_ENTRY_FAILURE,
            error: 'A VERY DRAMATIC ERROR ;('
        };
        const action_two = {
            type: UPDATE_LINKS_DATA_FAILURE,
            error: 'A VERY DRAMATIC ERROR ;('
        };

        const linksDataAfter = {
            data: {
                '918dbe': {
                    url: 'http://example.com/1',
                    startDate: '2017-02-17T12:26:03.199Z',
                    lastVisited: '2017-02-17T12:26:03.199Z',
                    visits: 0
                },
                'e67b': {
                    url: 'http://example.com/3',
                    startDate: '2017-04-17T11:56:08.830Z',
                    lastVisited: '2017-04-17T13:17:50.871Z',
                    visits: 0
                }
            },
            error: 'A VERY DRAMATIC ERROR ;('
        };

        expect(linksDataReducer(deepFreeze(linksDataBefore), deepFreeze(action_one))).toEqual(linksDataAfter);
        expect(linksDataReducer(deepFreeze(linksDataBefore), deepFreeze(action_two))).toEqual(linksDataAfter);
    });

    test('should update the entire data object with stats on links', () => {
        const linksDataBefore = {
            data: {
                '918dbe': {
                    url: 'http://example.com/1',
                    startDate: '2017-02-17T12:26:03.199Z',
                    lastVisited: '2017-02-17T12:26:03.199Z',
                    visits: 0
                },
                'abdf6c': {
                    url: 'http://example.com/2',
                    startDate: '2017-03-17T13:37:20.113Z',
                    lastVisited: '2017-03-17T13:37:50.795Z',
                    visits: 0
                },
                'e67b': {
                    url: 'http://example.com/3',
                    startDate: '2017-04-17T11:56:08.830Z',
                    lastVisited: '2017-04-17T13:17:50.871Z',
                    visits: 0
                }
            },
            error: null
        };
        const action = {
            type: UPDATE_LINKS_DATA_SUCCESS,
            data: {
                '918dbe': {
                    url: 'http://example.com/1',
                    startDate: '2017-02-17T12:26:03.199Z',
                    lastVisited: '2017-04-17T12:26:03.199Z',
                    visits: 1
                },
                'abdf6c': {
                    url: 'http://example.com/2',
                    startDate: '2017-03-17T13:37:20.113Z',
                    lastVisited: '2017-04-17T13:37:50.795Z',
                    visits: 2
                },
                'e67b': {
                    url: 'http://example.com/3',
                    startDate: '2017-04-17T11:56:08.830Z',
                    lastVisited: '2017-04-17T13:17:50.871Z',
                    visits: 3
                }
            }
        };
        const linksDataAfter = {
            data: {
                '918dbe': {
                    url: 'http://example.com/1',
                    startDate: '2017-02-17T12:26:03.199Z',
                    lastVisited: '2017-04-17T12:26:03.199Z',
                    visits: 1
                },
                'abdf6c': {
                    url: 'http://example.com/2',
                    startDate: '2017-03-17T13:37:20.113Z',
                    lastVisited: '2017-04-17T13:37:50.795Z',
                    visits: 2
                },
                'e67b': {
                    url: 'http://example.com/3',
                    startDate: '2017-04-17T11:56:08.830Z',
                    lastVisited: '2017-04-17T13:17:50.871Z',
                    visits: 3
                }
            },
            error: null
        };

        expect(linksDataReducer(deepFreeze(linksDataBefore), deepFreeze(action))).toEqual(linksDataAfter);
    });

    test('should erase the entire data object with stats on links', () => {
        const linksDataBefore = {
            data: {
                '918dbe': {
                    url: 'http://example.com/1',
                    startDate: '2017-02-17T12:26:03.199Z',
                    lastVisited: '2017-04-17T12:26:03.199Z',
                    visits: 1
                },
                'abdf6c': {
                    url: 'http://example.com/2',
                    startDate: '2017-03-17T13:37:20.113Z',
                    lastVisited: '2017-04-17T13:37:50.795Z',
                    visits: 2
                },
                'e67b': {
                    url: 'http://example.com/3',
                    startDate: '2017-04-17T11:56:08.830Z',
                    lastVisited: '2017-04-17T13:17:50.871Z',
                    visits: 3
                }
            },
            error: null
        };
        const action = {
            type: CLEAR_LINKS_DATA
        };
        const linksDataAfter = {
            data: {},
            error: null
        };

        expect(linksDataReducer(deepFreeze(linksDataBefore), deepFreeze(action))).toEqual(linksDataAfter);
    });
});