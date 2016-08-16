import { bindActionCreators } from 'redux';
import FilterForm from '../../components/organisms/FilterForm';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import { analyticsFilterFormSubmit, analyticsFiltersUpdate } from '../../signals';
import moment from 'moment';
import { changeForm } from 'app/common/actions';
import { getFilteredCampaign } from 'app/core/selectors/analytics';

const FORM_KEY = 'filterForm';

const mapStateToProps = state => {
  const campaign = getFilteredCampaign(state);
  const filters = state.analytics.filters;
  const triggers = _.filter(state.entities.triggers, x => x.campaignId === state.analytics.filters.campaignId);
  const frames = _.filter(state.entities.trainingResults, x => x.triggerId === _.get(triggers, '[0].triggerId'));

  return {
    campaign,
    triggers,
    frames,
    initialValues: {
      periodStart: filters.periodStart,
      periodEnd: filters.periodEnd
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      analyticsFilterFormSubmit,
      analyticsFiltersUpdate,
      changeForm: changeForm.bind(FORM_KEY)
    }, dispatch)
  };
};

const mergeProps = (stateProps, disptachProps, ownProps) => {
  return _.assign({}, stateProps, disptachProps, ownProps, {
    onSubmit: values => {
      return new Promise((resolve, reject) => {
        disptachProps.actions.analyticsFilterFormSubmit({
          values: values,
          form: 'filterForm',
          resolve,
          reject
        });
      });
    },

    onDatePresetClick: key => {
      const presets = {
        today: {
          periodStart: moment().startOf('day').valueOf(),
          periodEnd: moment().endOf('day').valueOf()
        },
        thisWeek: {
          periodStart: moment().startOf('week').valueOf(),
          periodEnd: moment().endOf('week').valueOf()
        },
        thisMonth: {
          periodStart: moment().startOf('month').valueOf(),
          periodEnd: moment().endOf('month').valueOf()
        }
      };

      const values = presets[key];

      disptachProps.actions.changeForm('periodStart', values.periodStart);
      disptachProps.actions.changeForm('periodEnd', values.periodEnd);
    },

    onTriggerClick: (trigger, index) => {
      disptachProps.actions.analyticsFiltersUpdate({
        triggerId: trigger.triggerId
      });
    },

    onFrameClick: (frame, index) => {
      disptachProps.actions.analyticsFiltersUpdate({
        frameId: frame.trainingResultId
      });
    }
  });
};

const fields = [
  'periodStart',
  'periodEnd',
  'triggerId'
];

let DecoratedComponent = FilterForm;
DecoratedComponent = reduxForm(
  {
    form: FORM_KEY,
    fields
  },
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;