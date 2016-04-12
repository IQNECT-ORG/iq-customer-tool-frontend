import React, { Component } from 'react';
import CreatePrintCampaignScene from './scenes/CreatePrintCampaignScene';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="campaign/create/:brandId/print" component={CreatePrintCampaignScene}/>
);