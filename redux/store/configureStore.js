import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from '../reducers/rootReducer';

import thunk from 'redux-thunk';  // TODO: remove thunk when done
import { autoRehydrate } from 'redux-persist';
// Can't import it here when it's only installed as a dev dependency.
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { getAxiosInstance } from '../../utils/axiosInstance';
import * as api from '../../utils/api';

const axiosInstance = getAxiosInstance();

const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies: { api } } );
const configureStore = () => {
    const middlewares = [epicMiddleware, thunk.withExtraArgument({ axiosInstance })];

    return createStore(
        rootReducer,
        // initialState,
        process.env.NODE_ENV === 'production' ?
            compose(applyMiddleware(...middlewares), autoRehydrate()) :
            require('redux-devtools-extension/developmentOnly').composeWithDevTools(applyMiddleware(...middlewares), autoRehydrate())
    );
};

export default configureStore;