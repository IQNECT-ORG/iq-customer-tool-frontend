import React, { Component } from 'react';
import Catalogue from './scenes/Catalogue';
import CatalogueBrands from './scenes/CatalogueBrands';
import CatalogueCampaigns from './scenes/CatalogueCampaigns';
import { Route, IndexRoute } from 'react-router';

export default [
  <Route path="catalogue" component={Catalogue} key="catalogue"/>,
  <Route path="catalogue/brands" component={CatalogueBrands} key="catalogue/brands"/>,
  <Route path="catalogue/campaigns" component={CatalogueCampaigns} key="catalogue/campaigns"/>
];