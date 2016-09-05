import { bindActionCreators } from 'redux';
import ui from 'redux-ui';
import CampaignForm from '../../components/organisms/ImageCampaignForm';
import _ from 'lodash';
import { campaignImageFormSubmit } from '../../signals';
import { reduxForm } from 'redux-form';
import { changeForm, removeArrayValueForm } from 'app/common/actions';
import { getCoupons } from 'app/core/selectors/entities/coupons';
import { ModalPaths } from 'app/common/Constants';
import { modalOpen } from 'app/modal/signals';

const FORM_KEY = 'campaignImage';

const mapStateToProps = (state, ownProps) => {
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
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      campaignImageFormSubmit,
      changeForm: changeForm.bind(null, FORM_KEY),
      removeArrayValueForm: removeArrayValueForm.bind(null, FORM_KEY),
      modalOpen
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onBackClick: (e) => {
      //ownProps.updateUI('step', ownProps.ui.step - 1);
    },

    onSubmit: values => {
      return new Promise((resolve, reject) => {
        dispatchProps.actions.campaignImageFormSubmit({
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
          form: FORM_KEY,
          resolve,
          reject
        });
      });
    },

    onAddWebsiteClick: (e) => {
      dispatchProps.actions.modalOpen({
        path: ModalPaths.WEBSITE_ADD,
        data: {
          form: 'campaignImage',
          field: `url`
        }
      });
    },

    onAddCouponClick: (e) => {
      dispatchProps.actions.modalOpen({
        path: ModalPaths.COUPON_ADD,
        data: {
          form: 'campaignImage',
          field: `couponId`
        }
      });
    },

    onWebsiteDeleteClick: (e) => {
      dispatchProps.actions.changeForm('url', null);
    },

    onTagsChange: (tags) => {
      dispatchProps.actions.changeForm('tags', tags);
    },

    onMediaChange: (fileGroup) => {
      _.each(fileGroup, (files, index) => {
        const field = `media[${index}]`;

        // This is the only way to get redux form
        // to detect a difference in file fields.
        // First you have to remove the field and
        // then re-add it. But not just a normal add
        // you have to defer it!
        dispatchProps.actions.removeArrayValueForm('media', index);
        setTimeout(() => {
          dispatchProps.actions.changeForm(field, files);
        }, 0);
      });
    }
  });
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
DecoratedComponent = reduxForm(
  {
    form: FORM_KEY,
    fields
  },
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;