import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawNav from '../components/layout/DrawNav';
import ui from 'redux-ui/transpiled';

const mapStateToProps = (state, ownProps) => {
  return {
    // I really do not like this. There should be a ssot
    isOpen: (ownProps.isOpen == null) ? ownProps.ui.isOpen : ownProps.isOpen
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      close: _ => {
        ownProps.updateUI('isOpen', false);
      },

      open: _ => {
        ownProps.updateUI('isOpen', true);
      }
    }
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