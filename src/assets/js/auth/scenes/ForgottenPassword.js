import React, { Component } from 'react';
import ForgottenPasswordFormContainer from '../containers/ForgottenPasswordFormContainer';
import FocusLayout from 'app/common/components/layouts/Focus';
import { Link } from 'react-router';

class ForgottenPassword extends Component {
  render() {
    return (
      <FocusLayout>
        <div className="vertically-align">
          <div className="container">
            <div className="row">
              <div className="col-xs-8 col-xs-offset-2">
                <h1 className="type-colour-02 text-xs-center">
                  Password Reset
                </h1>

                <div className="pane pane--filled">
                  <ForgottenPasswordFormContainer/>
                </div>

                <div className="text-xs-center">
                  <Link to="/signin" className="type-colour-02">Back to log in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FocusLayout>
    );
  }
};

export default ForgottenPassword;