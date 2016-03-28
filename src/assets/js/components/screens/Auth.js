import React, { Component } from 'react';
import SysAlertManager from '../common/SysAlertManager';
import LoginForm from '../common/forms/LoginForm';
import LoginFormController from '../hoc/LoginFormController';

class Auth extends Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
    };
  }


  componentWillReceiveProps(props, context) {
    if(context.router == null) {
      return;
    }

    if(props.auth.get('token')) {
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <div>
        <SysAlertManager/>
        <LoginForm onSubmit={this.props.onLoginFormSubmit}/>
      </div>
    );
  }
};

export default LoginFormController(Auth);