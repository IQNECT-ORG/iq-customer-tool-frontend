import React, { Component } from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import FocusLayout from 'app/common/components/layouts/Focus';
import { Link } from 'react-router';

class Login extends Component {
  render() {
    return (
      <FocusLayout>
        <div className="vertically-align">
          <div className="container">
            <div className="row">
              <div className="col-xs-8 col-xs-offset-2">
                <h1 className="type-colour-02 text-xs-center">
                  Welcome to iQNECT
                  <br/>
                  Please Log in
                </h1>

                <div className="pane pane--filled">
                  <LoginFormContainer/>
                </div>

                <div className="text-xs-center">
                  <span className="type-colour-02">Forgot your password? </span>
                  <Link to="/forgotten-password" className="type-colour-02">Click here to reset</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FocusLayout>
    );
  }
};

export default Login;