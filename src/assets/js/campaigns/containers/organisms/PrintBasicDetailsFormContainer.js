import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicDetailsForm from '../../components/print/forms/BasicDetailsForm';
import ui from 'redux-ui/transpiled';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import _ from 'lodash';
import { pdfCampaignFormSubmit } from '../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackClick: (e) => {
      //ownProps.updateUI('step', ownProps.ui.step - 1);
    },

    onSubmit: ownProps.handleSubmit((values) => {
      return new Promise((resolve, reject) => {
        dispatch(pdfCampaignFormSubmit({
          values: {
            campaignId: values.campaignId,
            brandId: ownProps.selectedBrandId,
            type: ownProps.selectedCampaignTypeId,
            name: values.campaignTitle,
            url: values.defaultTarget,
            language: values.magazineLanguage,
            media: _.get(values, ['media', 0]),
            periodFrom: values.campaignPeriodFrom,
            periodTo: values.campaignPeriodTo
          },
          updateUI: ownProps.updateUI,
          pagesAddField: ownProps.fields.pages.addField,
          form: 'campaignPrint',
          resolve,
          reject
        }));
      });
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