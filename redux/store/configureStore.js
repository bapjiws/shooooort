import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const configureStore = () => {
    const middlewares = [thunk];

    return createStore(
        rootReducer,
        // initialState,
        composeWithDevTools(
            applyMiddleware(...middlewares),
            autoRehydrate()
        )
    );
};

export default configureStore;