import React from 'react';
import LoginFormContainer from '../../containers/organisms/LoginFormContainer';
import FocusLayout from 'app/common/components/layouts/Focus';
import { Link } from 'react-router';

const Login = (props) => {
  return (
    <FocusLayout>
      <div className="vertically-align">
        <div className="container">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <h1 className="type-colour-02 text-xs-center m-b-2">
                Welcome to iQNECT
                <br/>
                Please Log in
              </h1>

              <div className="pane pane--filled pane--shadow-strong">
                <div className="pane__body">
                  <LoginFormContainer/>
                </div>
              </div>

              <div className="post-pane text-xs-center m-t-1">
                <span className="type-colour-02">Forgot your password? </span>
                <Link to="/forgotten-password" className="type-colour-02">Click here to reset</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusLayout>
  );
};
Login.displayName = 'AuthLoginPage';
Login.propTypes = {

};

export default Login;