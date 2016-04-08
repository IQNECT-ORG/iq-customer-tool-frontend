import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import CreateCampaign from '../components/CreateCampaign';
import BasicDetailsFormContainer from './BasicDetailsFormContainer';
import AllPagesFormContainer from './AllPagesFormContainer';
import PageDetailsFormContainer from './PageDetailsFormContainer';
import { reduxForm } from 'redux-form';

const mapStateToProps = (state, ownProps) => {
  return {
    step: ownProps.ui.step,
    components: [
      BasicDetailsFormContainer,
      AllPagesFormContainer,
      PageDetailsFormContainer
    ]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

const fields = [
  'id',
  'media',
  'campaignTitle',
  'magazineLanguage',
  'campaignPeriodFrom',
  'campaignPeriodTo',
  'defaultTarget',

  'fallback.website',
  'fallback.tags',

  'pages[].website',
  'pages[].tags'
];

let DecoratedComponent = CreateCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'createCampaignPrint',
  fields
})(DecoratedComponent);
DecoratedComponent = ui({
  key: 'createCampaignPrint',
  state: {
    step: 1,
    page: null
  }
})(DecoratedComponent);

export default DecoratedComponent;