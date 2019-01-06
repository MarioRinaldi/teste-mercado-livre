import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';

import { Provider } from 'react-redux';
import searchReducer from './store';

const reducers = combineReducers({
  search: searchReducer
});

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
