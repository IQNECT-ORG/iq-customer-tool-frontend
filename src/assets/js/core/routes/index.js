import React, { Component } from 'react';
import App from '../components/App';
import Home from '../components/screens/Home';
import Auth from '../components/screens/Auth';
import Catalogue from '../components/screens/Catalogue';
import CatalogueBrands from '../components/screens/CatalogueBrands';
import CreateCampaign from 'app/campaigns/print/components/screens/CreateCampaign';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="signin" component={Auth}/>
    <Route path="catalogue" component={Catalogue}/>
    <Route path="catalogue/brands" component={CatalogueBrands}/>
    <Route path="campaign/create" component={CreateCampaign}/>
  </Route>
);