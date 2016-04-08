import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicDetailsForm from '../components/forms/BasicDetailsForm';
import ui from 'redux-ui/transpiled';
import { reduxForm } from 'redux-form';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackClick: (e) => {
      ownProps.updateUI('step', ownProps.ui.step - 1);
    },

    onSubmit: ownProps.handleSubmit((...args) => {
      ownProps.updateUI('step', ownProps.ui.step + 1);
    }),

    onPreviewWebsiteClick: (e) => {
      dispatch(updateModalPath('previewWebsite'));
      dispatch(updateModalData({
        website: 'http://www.google.com/'
      }));
      dispatch(openModal());
    }
  };
};

const fields = [
  'id',
  'media',
  'campaignTitle',
  'magazineLanguage',
  'campaignPeriodFrom',
  'campaignPeriodTo',
  'defaultTarget'
];

let DecoratedComponent = BasicDetailsForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'campaignPrintBasicDetails',
  fields
})(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;