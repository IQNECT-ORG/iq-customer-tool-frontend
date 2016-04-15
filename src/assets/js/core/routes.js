import React, { Component } from 'react';
import App from './components/App';
import authRoutes from 'app/auth/routes';
import campaignRoutes from 'app/campaigns/routes';
import catalogueRoutes from 'app/catalogue/routes';
import dashboardRoutes from 'app/dashboard/routes';

import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={App}>
    {authRoutes}
    {campaignRoutes}
    {catalogueRoutes}
    {dashboardRoutes}
  </Route>
);