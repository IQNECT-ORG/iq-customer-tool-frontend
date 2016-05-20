import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterForm from '../components/filters/forms/FilterForm';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import { filterFormSubmit } from '../actions';
import moment from 'moment';
import { change } from 'redux-form/lib/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: ownProps.handleSubmit((values) => {
      return new Promise((resolve, reject) => {
        dispatch(filterFormSubmit({
          values: values,
          form: 'filterForm',
          resolve,
          reject
        }));
      });
    }),

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

      const startChangeAction = change('periodStart', values.periodStart);
      startChangeAction.form = 'filterForm';
      dispatch(startChangeAction);

      const endChangeAction = change('periodEnd', values.periodEnd);
      endChangeAction.form = 'filterForm';
      dispatch(endChangeAction);
    }
  };
};

const fields = [
  'periodStart',
  'periodEnd',
  'triggerId'
];

let DecoratedComponent = FilterForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm(
  {
    form: 'filterForm',
    fields
  },
  (state, ownProps) => { // mapStateToProps
    const filters = state.analytics.filters;

    return {
      initialValues: {
        periodStart: filters.periodStart,
        periodEnd: filters.periodEnd
      }
    };
  }
)(DecoratedComponent);

export default DecoratedComponent;