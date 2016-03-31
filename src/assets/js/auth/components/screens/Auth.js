import React, { Component } from 'react';
import SysAlertManager from 'app/common/components/SysAlertManager';
import LoginForm from 'app/common/components/forms/LoginForm';
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
        <SysAlertManager alerts={this.props.alerts}/>
        <LoginForm onSubmit={this.props.onLoginFormSubmit}/>
      </div>
    );
  }
};

export default LoginFormController(Auth);