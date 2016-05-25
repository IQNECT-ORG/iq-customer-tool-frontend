import React, { Component } from 'react';
import { connect } from 'react-redux';
import SystemAlertMessages from '../components/SystemAlertMessages';
import { getAlertMessages } from 'app/core/selectors/alertMessages';
import _ from 'lodash';
import { readAlertMessage } from '../actions/alertMessages';

const mapStateToProps = (state, ownProps) => {
  return {
    messages: getAlertMessages(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onExpire: (index) => {
      dispatch(readAlertMessage(index));
    },
    onDismiss: (index) => {
      dispatch(readAlertMessage(index));
    }
  };
};

let DecoratedComponent = SystemAlertMessages;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;