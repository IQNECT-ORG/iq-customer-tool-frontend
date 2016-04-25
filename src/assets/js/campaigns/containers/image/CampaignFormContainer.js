import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignForm from '../../components/image/forms/CampaignForm';
import ui from 'redux-ui/transpiled';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import _ from 'lodash';
import { imageCampaignFormSubmit } from '../../actions';
import { reduxForm } from 'redux-form';
import { change } from 'redux-form/lib/actions';

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
        dispatch(imageCampaignFormSubmit({
          values: {
            // campaignId: values.campaignId,
            // defaultBrand: ownProps.selectedBrandId,
            // type: ownProps.selectedCampaignTypeId,
            // name: values.campaignTitle,
            // url: values.defaultTarget,
            // image: _.get(values, ['media', 0]),
            // periodFrom: values.campaignPeriodFrom,
            // periodTo: values.campaignPeriodTo
          },
          updateUI: ownProps.updateUI,
          form: 'campaignImage',
          resolve,
          reject
        }));
      });
    }),

    onAddWebsiteClick: (e) => {
      dispatch(updateModalPath('addWebsite'));
      dispatch(updateModalData({
        form: 'campaignImage',
        field: `website`
      }));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {
      dispatch(updateModalPath('addCoupon'));
      dispatch(updateModalData({
        form: 'campaignImage'
      }));
      dispatch(openModal());
    },

    onWebsiteDeleteClick: (e) => {
      const changeAction = change(`website`, null);
      changeAction.form = 'campaignImage';
      dispatch(changeAction);
    },

    onTagsChange: (tags) => {
      const changeAction = change(`tags`, tags);
      changeAction.form = 'campaignImage';
      dispatch(changeAction);
    }
  };
};

const fields = [
  'media',
  'campaignId',
  'campaignTitle',
  'campaignPeriodFrom',
  'campaignPeriodTo',
  'website',
  'coupon',
  'tags'
];

let DecoratedComponent = CampaignForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm(
  {
    form: 'campaignImage',
    fields
  },
  (state, ownProps) => { // mapStateToProps
    return {
      initialValues: {
      }
    };
  }
)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;