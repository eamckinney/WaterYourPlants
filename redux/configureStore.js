import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { notifications } from './notifications';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
    key: 'root',
    storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            notifications
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return { persistor, store };
};