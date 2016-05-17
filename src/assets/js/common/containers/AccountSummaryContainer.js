import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountSummary from '../components/layout/AccountSummary';
import { getLoggedInUser } from 'app/core/selectors/entities/users';

const mapStateToProps = (state, ownProps) => {
  return {
    user: getLoggedInUser(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = AccountSummary;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;