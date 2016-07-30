import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

// import Login from './static/login.jsx';
// import newCard from './static/newCard.jsx';
// import Signup from './static/signup.jsx';
import Form from './react/Form.jsx';
import App from './App.js';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/new" component={Form} />
    <Route path='*' component={App} />
  </Router>, document.getElementById('content')
);