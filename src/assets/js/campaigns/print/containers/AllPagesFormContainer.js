import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllPagesForm from '../components/forms/AllPagesForm';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import ui from 'redux-ui/transpiled';
import { change } from 'redux-form/lib/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackClick: (e) => {
      ownProps.updateUI('step', ownProps.ui.step - 1);
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