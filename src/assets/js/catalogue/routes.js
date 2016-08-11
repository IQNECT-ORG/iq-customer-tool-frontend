import React, { Component } from 'react';
import Index from './containers/pages/IndexContainer';
import Brands from './containers/pages/BrandsContainer';
import Campaigns from './containers/pages/CampaignsContainer';
import Coupons from './containers/pages/CouponsContainer';

import Brand from './components/pages/Brand';
import Campaign from './components/pages/Campaign';
import Coupon from './components/pages/Coupon';
import { Route, IndexRoute } from 'react-router';

export default [
  <Route path="manage" component={Index} key="manage"/>,
  <Route path="manage/brands" component={Brands} key="manage/brands"/>,
  <Route path="manage/campaigns" component={Campaigns} key="manage/campaigns"/>,
  <Route path="manage/coupons" component={Coupons} key="manage/coupons"/>,

  <Route path="manage/brands/:brandId" component={Brand} key="manage/brand"/>,
  <Route path="manage/campaigns/:campaignId" component={Campaign} key="manage/campaign"/>,
  <Route path="manage/coupons/:couponId" component={Coupon} key="manage/coupon"/>
];