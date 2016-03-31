import React, { Component } from 'react';
import CreateCampaign from './components/screens/CreateCampaign';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="campaign/create" component={CreateCampaign}/>
);