import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageDetailsForm from '../components/forms/PageDetailsForm';
import { openModal, updateModalPath } from 'app/modal/actions';
import ui from 'redux-ui/transpiled';
import { reduxForm } from 'redux-form';

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
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {

    }
  };
}

const fields = [];

let DecoratedComponent = PageDetailsForm;
DecoratedComponent = reduxForm({
  form: 'campaignPrintPageDetails',
  fields
})(DecoratedComponent);
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;