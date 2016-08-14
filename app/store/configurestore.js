import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

const configureStore = (initialState) => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            //autoRehydrate(),
            applyMiddleware(thunkMiddleware)
        )
    );

    //persistStore(store, {storage: AsyncStorage})

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

export default configureStore;
