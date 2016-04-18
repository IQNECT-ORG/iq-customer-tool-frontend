import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddWebsiteForm from '../components/forms/AddWebsiteForm';
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

const fields = ['website'];

let DecoratedComponent = AddWebsiteForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'addWebsite',
  fields,
},
(state, ownProps) => {
  const form = state.form[ownProps.referenceForm];

  return {
    initialValues: {
      website: _.get(form, ownProps.referenceField).value
    }
  };
}
)(DecoratedComponent);

export default DecoratedComponent;