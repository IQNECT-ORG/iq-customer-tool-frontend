import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BasicDetailsForm from '../../components/organisms/PrintBasicDetailsForm';
import ui from 'redux-ui';
import _ from 'lodash';
import { campaignPDFFormSubmit } from '../../signals';

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      campaignPDFFormSubmit
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onBackClick: (e) => {
      //ownProps.updateUI('step', ownProps.ui.step - 1);
    },

    handleSubmit: ownProps.handleSubmit((values) => {
      return new Promise((resolve, reject) => {
        dispatchProps.actions.campaignPDFFormSubmit({
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
          form: ownProps.formKey,
          resolve,
          reject
        });
      });
    }),

    onPreviewWebsiteClick: (e) => {
      // dispatch(updateModalPath('previewWebsite'));
      // dispatch(updateModalData({
      //   website: 'http://www.google.com/'
      // }));
      // dispatch(openModal());
    }
  });
};


let DecoratedComponent = BasicDetailsForm;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;