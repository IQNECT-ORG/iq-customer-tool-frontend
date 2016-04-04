import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllPagesForm from '../components/forms/AllPagesForm';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import ui from 'redux-ui/transpiled';
import { reduxForm } from 'redux-form';
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

    onSubmit: (...args) => {
      ownProps.updateUI('step', ownProps.ui.step + 1);
    },

    onAddWebsiteClick: (e) => {
      dispatch(updateModalPath('addWebsite'));
      dispatch(updateModalData({
        form: 'campaignPrintAllPages'
      }));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {

    },

    onWebsiteDeleteClick: (e) => {
      const changeAction = change('website', null);
      changeAction.form = 'campaignPrintAllPages';
      dispatch(changeAction);
    }
  };
}

const fields = ['website'];

let DecoratedComponent = AllPagesForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'campaignPrintAllPages',
  fields
})(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;