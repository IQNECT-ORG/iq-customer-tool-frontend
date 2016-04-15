import React, { Component } from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';
import FocusLayout from 'app/common/components/layouts/Focus';

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
      <FocusLayout>
        <div className="pane pane--filled">
          <LoginFormContainer/>
        </div>
      </FocusLayout>
    );
  }
};

export default Auth;