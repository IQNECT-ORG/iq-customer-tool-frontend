import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllPagesForm from '../components/forms/AllPagesForm';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import ui from 'redux-ui/transpiled';
import { change } from 'redux-form/lib/actions';
import { getTrainingResults } from 'app/core/selectors/entities/trainingResults';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  const trainingResults = getTrainingResults(state);

  return {
    images: _.map(trainingResults, x => {
      return x.images.default;
    })
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePage: (page) => {
      ownProps.updateUI({
        pageView: 'DETAIL',
        page
      });
    },

    onBackClick: (e) => {
      ownProps.updateUI('step', 0);
    },

    onSubmit: ownProps.handleSubmit((...args) => {
      ownProps.updateUI({
        step: 2,
        page: null,
        pageView: null
      });
    }),

    onSwitchViewClick: (e) => {
      ownProps.updateUI({
        pageView: 'DETAIL'
      });
    },

    onAddWebsiteClick: (e) => {
      dispatch(updateModalPath('addWebsite'));
      dispatch(updateModalData({
        form: 'createCampaignPrint',
        field: 'fallback.website'
      }));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {
      dispatch(updateModalPath('addCoupon'));
      dispatch(updateModalData({
        form: 'createCampaignPrint'
      }));
      dispatch(openModal());
    },

    onWebsiteDeleteClick: (e) => {
      const changeAction = change('fallback.website', null);
      changeAction.form = 'createCampaignPrint';
      dispatch(changeAction);
    },

    onCouponDeleteClick: (e) => {
      const changeAction = change('fallback.coupon', null);
      changeAction.form = 'createCampaignPrint';
      dispatch(changeAction);
    },

    onTagsChange: (tags) => {
      const changeAction = change('fallback.tags', tags);
      changeAction.form = 'createCampaignPrint';
      dispatch(changeAction);
    }
  };
}

let DecoratedComponent = AllPagesForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;