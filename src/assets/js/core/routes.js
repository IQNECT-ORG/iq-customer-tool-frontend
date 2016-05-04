import React, { Component } from 'react';
import App from './components/App';
import authRoutes from 'app/auth/routes';
import campaignRoutes from 'app/campaigns/routes';
import catalogueRoutes from 'app/catalogue/routes';
import dashboardRoutes from 'app/dashboard/routes';
import analyticsRoutes from 'app/analytics/routes';

import { Route, IndexRoute } from 'react-router';

import TestScene from './components/Test';

export default (
  <Route path="/" component={App}>
    <Route path="/test" component={TestScene}/>
    {authRoutes}
    {campaignRoutes}
    {catalogueRoutes}
    {dashboardRoutes}
    {analyticsRoutes}
  </Route>
);