import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/forms/LoginForm';
import { authLogin } from '../actions';
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
      dispatch(authLogin({
        email: values.email,
        password: values.password,
        remember: 0
      }));
    })
  };
};

const fields = ['email', 'password'];

let DecoratedComponent = LoginForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'loginForm',
  fields
})(DecoratedComponent);
DecoratedComponent = ui({
  key: 'loginForm',
  state: {

  }
})(DecoratedComponent);

export default DecoratedComponent;