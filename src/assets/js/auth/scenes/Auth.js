import React, { Component } from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
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

    // if(props.auth.get('token')) {
    //   this.context.router.push('/');
    // }
  }

  render() {
    return (
      <div>
        <LoginFormContainer/>
      </div>
    );
  }
};

export default Auth;