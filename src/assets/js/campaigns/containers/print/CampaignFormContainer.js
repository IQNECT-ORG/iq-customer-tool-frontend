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

  'fallback.url',
  'fallback.tags',
  'fallback.coupon',

  'pages[].url',
  'pages[].tags',
  'pages[].coupon'
];

let DecoratedComponent = CreateCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm(
  {
    form: 'campaignPrint',
    fields
  },
  (state, ownProps) => { // mapStateToProps
    const pages = _.reduce(ownProps.triggers, (result, trigger) => {
      result.push({
        url: trigger.url,
        coupon: undefined,
        tags: undefined
      });
      return result;
    }, []);

    return {
      initialValues: {
        campaignId: _.get(ownProps, 'campaign.campaignId'),
        campaignTitle: _.get(ownProps, 'campaign.name'),
        magazineLanguage: _.get(ownProps, 'triggers.0.language'),
        defaultTarget: _.get(ownProps, 'triggers.0.url'),

        triggerId: _.get(ownProps, 'triggers.0.triggerId'),

        pages
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