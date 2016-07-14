import React, { Component } from 'react';
import Login from './containers/pages/LoginContainer';
import ForgottenPassword from './containers/pages/ForgottenPasswordContainer';
import ResetPassword from './containers/pages/ResetPasswordContainer';
import { Route } from 'react-router';

export default [
  <Route path="signin" component={Login} key="signin"/>,
  <Route path="forgotten-password" component={ForgottenPassword} key="forgotten_password"/>,
  <Route path="reset-password" component={ResetPassword} key="reset_password"/>
];