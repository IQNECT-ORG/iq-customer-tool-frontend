import React from 'react';
import ForgottenPasswordFormContainer from '../../containers/organisms/ForgottenPasswordFormContainer';
import FocusLayout from 'app/common/components/templates/Focus';
import { Link } from 'react-router';

const ForgottenPassword = (props) => {
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
                  <ForgottenPasswordFormContainer/>
                </div>
              </div>

              <div className="post-pane text-xs-center m-t-1">
                <Link to="/signin" className="type-colour-02">Back to log in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusLayout>
  );
};
ForgottenPassword.displayName = 'AuthForgottenPasswordPage';
ForgottenPassword.propTypes = {

};

export default ForgottenPassword;