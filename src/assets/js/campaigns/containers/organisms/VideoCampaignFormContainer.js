import { bindActionCreators } from 'redux';
import CampaignForm from '../../components/organisms/VideoCampaignForm';
import ui from 'redux-ui';
import _ from 'lodash';
import { campaignVideoFormSubmit } from '../../signals';
import { reduxForm } from 'redux-form';
import { changeForm } from 'app/common/actions';
import { getCoupons } from 'app/core/selectors/entities/coupons';

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
      changeForm: changeForm.bind(FORM_KEY)
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
      // dispatch(updateModalPath('addWebsite'));
      // dispatch(updateModalData({
      //   form: 'campaignVideo',
      //   field: `url`
      // }));
      // dispatch(openModal());
    },

    onAddCouponClick: (e) => {
      // dispatch(updateModalPath('addCoupon'));
      // dispatch(updateModalData({
      //   form: 'campaignVideo',
      //   field: 'couponId'
      // }));
      // dispatch(openModal());
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