import React, { Component } from 'react';
import ResetPasswordFormContainer from '../containers/ResetPasswordFormContainer';
import FocusLayout from 'app/common/components/layouts/Focus';
import { Link } from 'react-router';

class ResetPassword extends Component {
  render() {
    return (
      <FocusLayout>
        <h1>
          Password Reset
        </h1>

        <div className="pane pane--filled">
          <ResetPasswordFormContainer/>
        </div>

        <span>
          <Link to="/signin">Back to log in</Link>
        </span>
      </FocusLayout>
    );
  }
};

export default ResetPassword;