import React, { Component } from 'react';
import SysAlertManager from '../common/SysAlertManager';
import LoginForm from '../common/forms/LoginForm';

class Auth extends Component {
  render() {
    return (
      <div>
        <SysAlertManager/>
        <LoginForm/>
      </div>
    );
  }
};

export default Auth;