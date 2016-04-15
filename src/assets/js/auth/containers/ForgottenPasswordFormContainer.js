import React, { Component } from 'react';
import { connect } from 'react-redux';
import ForgottenPasswordForm from '../components/forms/ForgottenPasswordForm';
import {  } from '../actions';
import ui from 'redux-ui/transpiled';
import { change } from 'redux-form/lib/actions';
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

const fields = ['email'];

let DecoratedComponent = ForgottenPasswordForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'forgottenPassword',
  fields
})(DecoratedComponent);
DecoratedComponent = ui({
  key: 'forgottenPassword',
  state: {

  }
})(DecoratedComponent);

export default DecoratedComponent;