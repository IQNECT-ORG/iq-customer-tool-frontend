import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignForm from '../../components/image/forms/CampaignForm';
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
        field: `url`
      }));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {
      dispatch(updateModalPath('addCoupon'));
      dispatch(updateModalData({
        form: 'campaignImage',
        field: 'couponId'
      }));
      dispatch(openModal());
    },

    onWebsiteDeleteClick: (e) => {
      const changeAction = change(`url`, null);
      changeAction.form = 'campaignImage';
      dispatch(changeAction);
    },

    onTagsChange: (tags) => {
      const changeAction = change(`tags`, tags);
      changeAction.form = 'campaignImage';
      dispatch(changeAction);
    },

    onMediaChange: (fileGroup) => {
      _.each(fileGroup, (files, index) => {
        const changeAction = change(`media[${index}]`, files);
        changeAction.form = 'campaignImage';
        dispatch(changeAction);
      });
    }
  };
};

const fields = [
  'media[]',
  'campaignId',
  'name',
  'periodFrom',
  'periodTo',
  'url',
  'couponId',
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
    // This is needed purely to get the consistent
    // attributes from a given trigger to apply to the form
    let anyTrigger;
    if(ownProps.triggers) {
      anyTrigger = ownProps.triggers[_.keys(ownProps.triggers)[0]];
    }

    return {
      initialValues: {
        campaignId: _.get(ownProps, 'campaign.campaignId'),
        name: _.get(ownProps, 'campaign.name'),
        url: _.get(anyTrigger, 'url'),
        //triggerId: _.get(ownProps, 'trigger.triggerId')
      }
    };
  }
)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;