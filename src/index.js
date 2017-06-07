import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppProvider from '../redux/AppProvider';

// ReactDOM.render(
//     <AppProvider />,
//     document.getElementById('app')
// );

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