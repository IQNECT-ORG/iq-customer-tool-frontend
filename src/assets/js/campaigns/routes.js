import React, { Component } from 'react';
import CreateCampaignScene from './scenes/CreateCampaignScene';
import EditCampaignScene from './scenes/EditCampaignScene';
import { Route, IndexRoute } from 'react-router';

export default [
  <Route path="campaigns/create" component={CreateCampaignScene} key="campaign_create_brand"/>,
  <Route path="campaigns/create/:brandId" component={CreateCampaignScene} key="campaign_create_campaign_type"/>,
  <Route path="campaigns/create/:brandId/:campaignTypeId" component={CreateCampaignScene} key="campaign_create"/>,

  <Route path="campaigns/edit/:campaignId" component={EditCampaignScene} key="campaign_edit"/>,
];