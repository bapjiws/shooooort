import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from '../src/App';

const store = configureStore();

const AppProvider = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
};

export default AppProvider;