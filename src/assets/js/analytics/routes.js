import React, { Component } from 'react';
import Overview from './scenes/Overview';
import { Route } from 'react-router';

export default [
  <Route path="analytics" component={Overview} key="analytics"/>
];