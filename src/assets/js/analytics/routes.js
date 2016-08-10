import React, { Component } from 'react';
import Overview from './containers/pages/OverviewContainer';
import { Route } from 'react-router';

export default [
  <Route path="analytics" component={Overview} key="analytics"/>
];