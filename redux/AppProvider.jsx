import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import localForage from 'localforage';

import configureStore from './store/configureStore';
import App from '../src/components/App';

const store = configureStore();

// See: https://github.com/rt2zz/redux-persist/blob/master/docs/recipes.md#delay-render-until-rehydration-complete
export default class AppProvider extends Component {

    constructor() {
        super();
        this.state = { rehydrated: false };
    }

    componentWillMount() {
        // See: https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
        persistStore(store, {storage: localForage}, () => {
            this.setState({ rehydrated: true })
        })
    }

    render() {
        return this.state.rehydrated &&
            <Provider store={store}>
                <App />
            </Provider>
    }
}