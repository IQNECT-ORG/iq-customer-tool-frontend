import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import { authResetPassword } from '../actions';
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
      dispatch(authResetPassword({
        code: values.token,
        password: values.password,
        rePassword: values.passwordMatch
      }));
    })
  };
};

const fields = ['token', 'password', 'passwordMatch'];

let DecoratedComponent = ResetPasswordForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'resetPassword',
  fields
})(DecoratedComponent);
DecoratedComponent = ui({
  key: 'resetPassword',
  state: {

  }
})(DecoratedComponent);

export default DecoratedComponent;