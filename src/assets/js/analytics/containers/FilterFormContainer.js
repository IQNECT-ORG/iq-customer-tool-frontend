import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterForm from '../components/filters/forms/FilterForm';
import _ from 'lodash';
import { reduxForm } from 'redux-form';
import { filterFormSubmit } from '../actions';

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
    })
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
    return {
      initialValues: {
      }
    };
  }
)(DecoratedComponent);

export default DecoratedComponent;