import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterForm from '../components/filters/forms/FilterForm';
import _ from 'lodash';
import { reduxForm } from 'redux-form';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: ownProps.handleSubmit((values) => {
    })
  };
};

const fields = [
  'dateStart',
  'dateEnd',
  'trigger'
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