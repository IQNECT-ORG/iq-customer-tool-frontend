import React, { Component } from 'react';
import ResetPasswordFormContainer from '../containers/ResetPasswordFormContainer';
import FocusLayout from 'app/common/components/layouts/Focus';
import { Link } from 'react-router';

class ResetPassword extends Component {
  render() {
    return (
      <FocusLayout>
        <div className="vertically-align">
          <div className="container">
            <div className="row">
              <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1 className="type-colour-02 text-xs-center">
                  Password Reset
                </h1>

                <div className="pane pane--filled">
                  <div className="pane__body">
                    <ResetPasswordFormContainer/>
                  </div>
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

export default ResetPassword;