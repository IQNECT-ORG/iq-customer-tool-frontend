import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicDetailsForm from '../components/forms/BasicDetailsForm';
import ui from 'redux-ui/transpiled';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import _ from 'lodash';

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
      // Reset all of the pages just in case
      _.times(ownProps.fields.pages.length, ownProps.fields.pages.removeField);

      // Fake number of pages extracted from magazine length
      _.times(5, n => ownProps.fields.pages.addField());

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


let DecoratedComponent = BasicDetailsForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;