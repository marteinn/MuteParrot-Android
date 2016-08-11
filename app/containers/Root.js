import React, {Component} from 'react'
import {Provider} from 'react-redux'
import App from './App'
import configureStore from '../store/configurestore';

const store = configureStore();

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export default Root;
