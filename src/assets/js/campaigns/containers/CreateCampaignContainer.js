import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import CreateCampaign from '../components/CreateCampaign';
import { reduxForm } from 'redux-form';

const mapStateToProps = (state, ownProps) => {
  return {
    step: ownProps.ui.step,
    page: ownProps.ui.page,
    pageView: ownProps.ui.pageView
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
  'fallback.coupon',

  'pages[].website',
  'pages[].tags',
  'pages[].coupon'
];

const validate = (values, props) => {
  return {
    //'campaignTitle': 'Incorrect!'
  };
};

let DecoratedComponent = CreateCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'createCampaignPrint',
  fields,
  validate
})(DecoratedComponent);
DecoratedComponent = ui({
  key: 'createCampaignPrint',
  state: {
    step: 0,
    page: null,
    pageView: null
  }
})(DecoratedComponent);

export default DecoratedComponent;