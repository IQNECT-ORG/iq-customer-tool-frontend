import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppShim from './components/AppShim';
import App from './components/App';


// Store
import { createAppStore } from './store';

// Action Creators

// Store
const store = createAppStore();

// Action Creators

const DecoratedApp = AppShim({
  store
}, App);


ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={DecoratedApp}>
      </Route>
    </Router>
), document.getElementById('app'));