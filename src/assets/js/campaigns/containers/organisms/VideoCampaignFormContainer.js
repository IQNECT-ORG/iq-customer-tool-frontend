import { bindActionCreators } from 'redux';
import CampaignForm from '../../components/organisms/VideoCampaignForm';
import ui from 'redux-ui';
import _ from 'lodash';
import { campaignVideoFormSubmit } from '../../signals';
import { reduxForm } from 'redux-form';
import { changeForm } from 'app/common/actions';
import { getCoupons } from 'app/core/selectors/entities/coupons';
import { ModalPaths } from 'app/common/Constants';
import { modalOpen } from 'app/modal/signals';

const FORM_KEY = 'campaignVideo';

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      name: _.get(ownProps, 'campaign.name'),
      url: _.get(ownProps, 'triggers.0.url'),
    }
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      campaignVideoFormSubmit,
      changeForm: changeForm.bind(null, FORM_KEY),
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
        dispatchProps.actions.campaignVideoFormSubmit({
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
          form: FORM_KEY,
          field: `url`
        }
      });
    },

    onAddCouponClick: (e) => {
      dispatchProps.actions.modalOpen({
        path: ModalPaths.COUPON_ADD,
        data: {
          form: FORM_KEY,
          field: `couponId`
        }
      });
    },

    onWebsiteDeleteClick: (e) => {
      dispatchProps.actions.changeForm(`url`, null);
    },

    onTagsChange: (tags) => {
      dispatchProps.actions.changeForm(`tags`, tags);
    }
  });
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
DecoratedComponent = reduxForm(
  {
    form: FORM_KEY,
    fields,
    validate
  },
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui({
  key: FORM_KEY,
  state: {
  }
})(DecoratedComponent);

export default DecoratedComponent;