import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { getAxiosInstance } from '../../utils/axiosInstance';

const axiosInstance = getAxiosInstance();

const configureStore = () => {
    const middlewares = [thunk.withExtraArgument({ axiosInstance })];

    return createStore(
        rootReducer,
        // initialState,
        process.env.NODE_ENV === 'production' ?
            compose(applyMiddleware(...middlewares), autoRehydrate()) :
            composeWithDevTools(applyMiddleware(...middlewares), autoRehydrate())
    );
};

export default configureStore;