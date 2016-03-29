import React, { Component } from 'react';

class ModalManager extends Component {
  static get contextTypes() {
    return {
    };
  }

  _getComponent() {
    return this.props.paths[this.props.path] || null;
  }

  render() {
    const Component = this._getComponent();

    if(Component == null) {
      return null;
    }


    return <Component/>;
  }
};

export default ModalManager;