import ui from 'redux-ui';
import CreateCampaign from '../../components/organisms/PrintCampaignForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

const FORM_KEY = 'campaignPrint';

const mapStateToProps = (state, ownProps) => {
  const trigger = _.get(ownProps, 'triggers.0');

  const pages = _.reduce(ownProps.trainingResults, (result, trainingResult) => {
    const payload = _.find(ownProps.triggerPayloads, payload => {
      return payload.index == trainingResult.frame;
    });

    result.push({
      url: _.get(payload, 'data'),
      coupon: undefined,
      tags: undefined
    });
    return result;
  }, []);

  return {
    step: ownProps.ui.step,
    page: ownProps.ui.page,
    pageView: ownProps.ui.pageView,

    initialValues: {
      campaignId: _.get(ownProps, 'campaign.campaignId'),
      campaignTitle: _.get(ownProps, 'campaign.name'),
      magazineLanguage: _.get(ownProps, 'triggers.0.language'),
      defaultTarget: _.get(ownProps, 'triggers.0.url'),

      triggerId: _.get(trigger, 'triggerId'),

      pages
    }
  };
};

const mapDispatchToProps = undefined;
const mergeProps = undefined;

const fields = [
  'campaignId',
  'media',
  'campaignTitle',
  'magazineLanguage',
  'campaignPeriodFrom',
  'campaignPeriodTo',
  'defaultTarget',

  'triggerId',

  'fallback.url',
  'fallback.tags',
  'fallback.coupon',

  'pages[].url',
  'pages[].tags',
  'pages[].coupon'
];

let DecoratedComponent = CreateCampaign;
DecoratedComponent = reduxForm(
  {
    form: FORM_KEY,
    fields
  },
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui({
  key: FORM_KEY,
  state: {
    step: 0,
    page: null,
    pageView: null
  }
})(DecoratedComponent);

export default DecoratedComponent;