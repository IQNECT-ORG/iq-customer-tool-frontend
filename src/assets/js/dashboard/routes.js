import React, { Component } from 'react';
import IndexPage from './containers/pages/IndexContainer';
import { Route, IndexRoute } from 'react-router';

export default [
  <IndexRoute component={IndexPage} key="dashboard"/>,
];