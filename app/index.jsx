import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createCookieMiddleware } from 'redux-cookie';
import createSagaMiddleware from 'redux-saga';
import Cookies from 'js-cookie';
import allReducers from './reducers';
import App from './App';
import Sagas from './sagas/index';
import './Style.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducers, applyMiddleware(sagaMiddleware, createCookieMiddleware(Cookies)));
sagaMiddleware.run(Sagas);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'),
);
