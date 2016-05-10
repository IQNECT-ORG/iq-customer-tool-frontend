import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllPagesForm from '../../components/print/forms/AllPagesForm';
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
    gotoPage: (page) => {
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
        form: 'campaignPrint',
        field: 'fallback.url'
      }));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {
      dispatch(updateModalPath('addCoupon'));
      dispatch(updateModalData({
        form: 'campaignPrint',
        field: 'fallback.coupon'
      }));
      dispatch(openModal());
    },

    onWebsiteDeleteClick: (e) => {
      const changeAction = change('fallback.url', null);
      changeAction.form = 'campaignPrint';
      dispatch(changeAction);
    },

    onCouponDeleteClick: (e) => {
      const changeAction = change('fallback.coupon', null);
      changeAction.form = 'campaignPrint';
      dispatch(changeAction);
    },

    onTagsChange: (tags) => {
      const changeAction = change('fallback.tags', tags);
      changeAction.form = 'campaignPrint';
      dispatch(changeAction);
    }
  };
}

let DecoratedComponent = AllPagesForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;