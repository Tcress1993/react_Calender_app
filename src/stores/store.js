import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from "../reducers/authReducer";
import eventReducer from "../reducers/eventReducer";
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = configureStore({
    reducer: {
        auth: authReducer,
        event: eventReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk)
});

export default store;