import React, { Component } from 'react';
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
        <LoginForm onSubmit={this.props.onLoginFormSubmit}/>
      </div>
    );
  }
};

export default LoginFormController(Auth);