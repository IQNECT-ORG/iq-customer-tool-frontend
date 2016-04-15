import React, { Component } from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import FocusLayout from 'app/common/components/layouts/Focus';
import { Link } from 'react-router';

class Login extends Component {
  render() {
    return (
      <FocusLayout>
        <h1>
          Welcome to iQNECT
          <br/>
          Please Log in
        </h1>

        <div className="pane pane--filled">
          <LoginFormContainer/>
        </div>

        <span>
          <span>Forgot your password?</span>
          <Link to="/forgotten-password">Click here to reset</Link>
        </span>
      </FocusLayout>
    );
  }
};

export default Login;