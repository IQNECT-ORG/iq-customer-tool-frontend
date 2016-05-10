import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignForm from '../../components/video/forms/CampaignForm';
import ui from 'redux-ui/transpiled';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import _ from 'lodash';
import { imageCampaignFormSubmit } from '../../actions';
import { reduxForm } from 'redux-form';
import { change } from 'redux-form/lib/actions';
import { getCoupons } from 'app/core/selectors/entities/coupons';

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
            media: values.media,
            url: values.url,
            campaignId: values.campaignId,
            brandId: ownProps.selectedBrandId,
            type: ownProps.selectedCampaignTypeId,
            name: values.name,
            periodFrom: values.periodFrom,
            periodTo: values.periodTo,
            couponId: values.coupon
          },
          updateUI: ownProps.updateUI,
          form: 'campaignVideo',
          resolve,
          reject
        }));
      });
    }),

    onAddWebsiteClick: (e) => {
      dispatch(updateModalPath('addWebsite'));
      dispatch(updateModalData({
        form: 'campaignVideo',
        field: `url`
      }));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {
      dispatch(updateModalPath('addCoupon'));
      dispatch(updateModalData({
        form: 'campaignVideo',
        field: 'couponId'
      }));
      dispatch(openModal());
    },

    onWebsiteDeleteClick: (e) => {
      const changeAction = change(`url`, null);
      changeAction.form = 'campaignVideo';
      dispatch(changeAction);
    },

    onTagsChange: (tags) => {
      const changeAction = change(`tags`, tags);
      changeAction.form = 'campaignVideo';
      dispatch(changeAction);
    }
  };
};

const fields = [
  'media',
  'campaignId',
  'name',
  'periodFrom',
  'periodTo',
  'url',
  'couponId',
  'tags'
];

const validate = (values, props) => {
  return {
    //'campaignTitle': 'Incorrect!'
  };
};

let DecoratedComponent = CampaignForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm(
  {
    form: 'campaignVideo',
    fields,
    validate
  },
  (state, ownProps) => { // mapStateToProps
    return {
      initialValues: {
      }
    };
  }
)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'campaignVideo',
  state: {
  }
})(DecoratedComponent);

export default DecoratedComponent;