import React, { Component } from 'react';
import App from '../components/App';
import Home from '../components/screens/Home';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
  </Route>
);