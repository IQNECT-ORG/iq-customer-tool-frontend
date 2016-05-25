import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/forms/LoginForm';
import authActions from '../actions';
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
      return new Promise((resolve, reject) => {
        dispatch(authActions.login({
          values,
          form: 'loginForm',
          resolve,
          reject
        }));
      });
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