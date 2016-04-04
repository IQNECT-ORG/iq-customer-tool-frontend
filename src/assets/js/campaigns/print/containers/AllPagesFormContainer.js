import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllPagesForm from '../components/forms/AllPagesForm';
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

let DecoratedComponent = AllPagesForm;
DecoratedComponent = reduxForm({
  form: 'campaignPrintAllPages',
  fields
})(DecoratedComponent);
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;