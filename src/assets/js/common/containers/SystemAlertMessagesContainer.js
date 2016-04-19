import React, { Component } from 'react';
import { connect } from 'react-redux';
import SystemAlertMessages from '../components/SystemAlertMessages';
import ui from 'redux-ui/transpiled';
import { getErrors } from 'app/core/selectors/errors';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  return {
    alerts: _.map(getErrors(state), error => {
      return {
        name: error.name,
        message: error.message,
        level: 'danger'
      };
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = SystemAlertMessages;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'systemAlertMessages',
  state: {
  }
})(DecoratedComponent);

export default DecoratedComponent;