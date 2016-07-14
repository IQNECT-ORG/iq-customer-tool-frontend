import React, { Component } from 'react';
import Index from './containers/pages/IndexContainer';
import Brands from './containers/pages/BrandsContainer';
import Campaigns from './containers/pages/CampaignsContainer';
import Coupons from './containers/pages/CouponsContainer';
import { Route, IndexRoute } from 'react-router';

export default [
  <Route path="manage" component={Index} key="manage"/>,
  <Route path="manage/brands" component={Brands} key="manage/brands"/>,
  <Route path="manage/campaigns" component={Campaigns} key="manage/campaigns"/>,
  <Route path="manage/coupons" component={Coupons} key="manage/coupons"/>
];