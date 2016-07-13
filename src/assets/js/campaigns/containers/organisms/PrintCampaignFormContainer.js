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
    const trigger = _.get(ownProps, 'triggers.0');

    const pages = _.reduce(ownProps.trainingResults, (result, trainingResult) => {
      const payload = _.find(ownProps.triggerPayloads, payload => {
        return payload.index == trainingResult.frame;
      });

      result.push({
        url: _.get(payload, 'data'),
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

        triggerId: _.get(trigger, 'triggerId'),

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