import React, { Component } from 'react';
import Create from './containers/pages/CreateContainer';
import Edit from './containers/pages/EditContainer';
import { Route, IndexRoute } from 'react-router';

export default [
  <Route path="campaigns/create" component={Create} key="campaign_create_brand"/>,
  <Route path="campaigns/create/:brandId" component={Create} key="campaign_create_campaign_type"/>,
  <Route path="campaigns/create/:brandId/:campaignTypeId" component={Create} key="campaign_create"/>,

  <Route path="campaigns/edit/:campaignId" component={Edit} key="campaign_edit"/>,
];