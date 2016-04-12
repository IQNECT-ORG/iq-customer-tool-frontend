import React, { Component } from 'react';
import CreateCampaignScene from './scenes/CreateCampaignScene';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="campaign/create" component={CreateCampaignScene}/>
);