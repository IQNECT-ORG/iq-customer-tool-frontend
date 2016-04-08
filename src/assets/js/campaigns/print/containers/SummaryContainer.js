import React, { Component } from 'react';
import { connect } from 'react-redux';
import Summary from '../components/Summary';
import ui from 'redux-ui/transpiled';

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
}

let DecoratedComponent = Summary;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;