import React, { Component } from 'react';
import ForgottenPasswordFormContainer from '../containers/ForgottenPasswordFormContainer';
import FocusLayout from 'app/common/components/layouts/Focus';
import { Link } from 'react-router';

class ForgottenPassword extends Component {
  render() {
    return (
      <FocusLayout>
        <h1>
          Password Reset
        </h1>

        <div className="pane pane--filled">
          <ForgottenPasswordFormContainer/>
        </div>

        <span>
          <Link to="/signin">Back to log in</Link>
        </span>
      </FocusLayout>
    );
  }
};

export default ForgottenPassword;