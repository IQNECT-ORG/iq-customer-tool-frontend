import React, { Component } from 'react';
import Catalogue from './scenes/Catalogue';
import CatalogueBrands from './scenes/CatalogueBrands';
import CatalogueCampaigns from './scenes/CatalogueCampaigns';
import CatalogueCoupons from './scenes/CatalogueCoupons';
import { Route, IndexRoute } from 'react-router';

export default [
  <Route path="manage" component={Catalogue} key="manage"/>,
  <Route path="manage/brands" component={CatalogueBrands} key="manage/brands"/>,
  <Route path="manage/campaigns" component={CatalogueCampaigns} key="manage/campaigns"/>,
  <Route path="manage/coupons" component={CatalogueCoupons} key="manage/coupons"/>
];