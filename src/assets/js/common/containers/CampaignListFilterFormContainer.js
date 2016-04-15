import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterForm from '../components/forms/FilterForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: ownProps.handleSubmit((...args) => {
      return ownProps.onFormSubmit(...args);
    })
  };
};

const fields = ['filter'];

let DecoratedComponent = FilterForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'campaignListFilterForm',
  fields
})(DecoratedComponent);

export default DecoratedComponent;