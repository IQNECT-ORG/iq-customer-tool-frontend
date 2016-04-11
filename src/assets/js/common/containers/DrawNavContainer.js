import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawNav from '../components/layout/DrawNav';
import ui from 'redux-ui/transpiled';
import { change } from 'redux-form/lib/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    isOpen: ownProps.ui.isOpen
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = DrawNav;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'drawNav',
  state: {
    isOpen: true
  }
})(DecoratedComponent);

export default DecoratedComponent;