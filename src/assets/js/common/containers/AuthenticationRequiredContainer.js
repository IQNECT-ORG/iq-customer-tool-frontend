import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from 'app/core/selectors/auth';

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: isLoggedIn(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
    }
  };
};

const AuthenticationRequiredContainer = options => {
  return WrappedComponent => {
    class AuthenticationRequired extends Component {
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