import React, { Component } from 'react';
import CreateCampaignScene from './scenes/create/CreateCampaignScene';
import { Route, IndexRoute } from 'react-router';

export default [
  <Route path="campaign/create" component={CreateCampaignScene} key="campaign_create_brand"/>,
  <Route path="campaign/create/:brandId" component={CreateCampaignScene} key="campaign_create_campaign_type"/>,
  <Route path="campaign/create/:brandId/:campaignTypeId" component={CreateCampaignScene} key="campaign_create"/>
];