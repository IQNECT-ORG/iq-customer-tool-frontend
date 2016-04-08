import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageDetailsForm from '../components/forms/PageDetailsForm';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import ui from 'redux-ui/transpiled';

const mapStateToProps = (state, ownProps) => {
  return {
    page: ownProps.ui.page
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
        form: 'createCampaignPrint',
        field: `pages[${ownProps.ui.page}].website`
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
      const changeAction = change(`pages[${ownProps.ui.page}].website`, null);
      changeAction.form = 'createCampaignPrint';
      dispatch(changeAction);
    },

    onTagsChange: (tags) => {
      const changeAction = change(`pages[${ownProps.ui.page}].tags`, tags);
      changeAction.form = 'createCampaignPrint';
      dispatch(changeAction);
    }
  };
}



let DecoratedComponent = PageDetailsForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;