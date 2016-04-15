import React, { Component } from 'react';
import DashboardScene from './scenes/Dashboard';
import { Route, IndexRoute } from 'react-router';

export default [
  <IndexRoute component={DashboardScene} key="dashboard"/>,
];