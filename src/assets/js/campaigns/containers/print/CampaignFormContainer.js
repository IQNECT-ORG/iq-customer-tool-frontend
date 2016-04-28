import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import CreateCampaign from '../../components/print/forms/CampaignForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

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
  'campaignId',
  'media',
  'campaignTitle',
  'magazineLanguage',
  'campaignPeriodFrom',
  'campaignPeriodTo',
  'defaultTarget',

  'triggerId',

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
DecoratedComponent = reduxForm(
  {
    form: 'campaignPrint',
    fields,
    validate
  },
  (state, ownProps) => { // mapStateToProps
    return {
      initialValues: {
        campaignId: _.get(ownProps, 'campaign.campaignId'),
        campaignTitle: _.get(ownProps, 'campaign.name'),
        magazineLanguage: _.get(ownProps, 'triggers.0.language'),
        defaultTarget: _.get(ownProps, 'triggers.0.url'),

        triggerId: _.get(ownProps, 'triggers.0.triggerId')
      }
    };
  }
)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'campaignPrint',
  state: {
    step: 0,
    page: null,
    pageView: null
  }
})(DecoratedComponent);

export default DecoratedComponent;