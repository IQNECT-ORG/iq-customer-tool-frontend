import React, { Component } from 'react';
import Login from './scenes/Login';
import ForgottenPassword from './scenes/ForgottenPassword';
import ResetPassword from './scenes/ResetPassword';
import { Route } from 'react-router';

export default [
  <Route path="signin" component={Login} key="signin"/>,
  <Route path="forgotten-password" component={ForgottenPassword} key="forgotten_password"/>,
  <Route path="reset-password" component={ResetPassword} key="reset_password"/>
];