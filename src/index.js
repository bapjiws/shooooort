import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // Automatically disabled in production.

import AppProvider from '../redux/AppProvider';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
};

render(AppProvider);

if (module.hot) {
    module.hot.accept('../redux/AppProvider', () => { render(AppProvider) })
}