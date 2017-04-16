import React from 'react';
import ReactDOM from 'react-dom';

import AppProvider from '../redux/AppProvider';

ReactDOM.render(
    <AppProvider />,
    document.getElementById('app')
);