import React, { Component } from 'react';
import App from './components/App';
import Home from './components/screens/Home';
import authRoutes from 'app/auth/routes';
import campaignRoutes from 'app/campaigns/print/routes';
import catalogueRoutes from 'app/catalogue/routes';

import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    {authRoutes}
    {campaignRoutes}
    {catalogueRoutes}
  </Route>
);