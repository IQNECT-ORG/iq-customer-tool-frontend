import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from 'app/core/selectors/auth';
import { verifyAuthentication } from '../../signals';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      verifyAuthentication
    }, dispatch)
  };
};

const AuthenticationRequiredContainer = options => {
  return WrappedComponent => {
    class AuthenticationRequired extends Component {

      componentWillMount() {
        this.props.actions.verifyAuthentication();
      }

      render() {
        if(this.props.isLoggedIn === true) {
          return (
            <WrappedComponent {...this.props}/>
          );
        }

        return (
          <div>
            Checking authentication...
          </div>
        );
      }
    }
    let DecoratedComponent = AuthenticationRequired;
    DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
    return DecoratedComponent;
  }
};

export default AuthenticationRequiredContainer;