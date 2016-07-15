import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '../../components/molecules/Menu';
import ui from 'redux-ui/transpiled';

const mapStateToProps = (state, ownProps) => {
  return {
    isCatalogueSubmenuOpen: ownProps.ui.isCatalogueSubmenuOpen
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleSubMenu: () => {
      const curr = ownProps.ui.isCatalogueSubmenuOpen;
      ownProps.updateUI('isCatalogueSubmenuOpen', !curr);
    }
  };
};

let DecoratedComponent = Menu;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'menu',
  state: {
    isCatalogueSubmenuOpen: false
  }
})(DecoratedComponent);

export default DecoratedComponent;