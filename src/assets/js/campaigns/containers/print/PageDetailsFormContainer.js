import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageDetailsForm from '../../components/print/forms/PageDetailsForm';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import ui from 'redux-ui/transpiled';
import { change } from 'redux-form/lib/actions';
import { getTrainingResults } from 'app/core/selectors/entities/trainingResults';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  const trainingResults = getTrainingResults(state);
  const page = ownProps.ui.page;
  const pageCount = trainingResults.length;

  return {
    imageSrc: _.find(trainingResults, x => x.frame === page).images.default,
    page,
    pageCount,
    hasPrev: page > 0,
    hasNext: page < pageCount
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackClick: (e) => {
      ownProps.updateUI({
        step: 2,
        page: null
      });
    },

    onSubmit: ownProps.handleSubmit((...args) => {
      ownProps.updateUI({
        step: 2,
        page: null
      });
    }),

    onSwitchViewClick: (e) => {
      ownProps.updateUI({
        pageView: 'ALL'
      });
    },

    onPrevPageClick: (e) => {
      ownProps.updateUI({
        page: ownProps.ui.page - 1
      });
    },

    onNextPageClick: (e) => {
      ownProps.updateUI({
        page: ownProps.ui.page + 1
      });
    },

    onAddWebsiteClick: (e) => {
      dispatch(updateModalPath('addWebsite'));
      dispatch(updateModalData({
        form: 'campaignPrint',
        field: `pages[${ownProps.ui.page}].url`
      }));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {
      dispatch(updateModalPath('addCoupon'));
      dispatch(updateModalData({
        form: 'campaignPrint',
        field: `pages[${ownProps.ui.page}].coupon`
      }));
      dispatch(openModal());
    },

    onWebsiteDeleteClick: (e) => {
      const changeAction = change(`pages[${ownProps.ui.page}].url`, null);
      changeAction.form = 'campaignPrint';
      dispatch(changeAction);
    },

    onTagsChange: (tags) => {
      const changeAction = change(`pages[${ownProps.ui.page}].tags`, tags);
      changeAction.form = 'campaignPrint';
      dispatch(changeAction);
    }
  };
}



let DecoratedComponent = PageDetailsForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;