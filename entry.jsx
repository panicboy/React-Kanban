import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import  { createStore, combineReducers } from 'redux';

const reducer = combineReducers(reducers);
const store = createStore(reducer);
console.log('store.getState(): ', store.getState());

import Form from './react/Form.jsx';
import App from './App.js';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='*' component={App} />
    </Router>
  </Provider>, document.getElementById('content')
);