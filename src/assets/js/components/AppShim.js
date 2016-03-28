import React, { Component, PropTypes } from 'react';

let AppShim = (di, Component) => class extends Component {
  static get childContextTypes() {
    return {
      store: PropTypes.object
    }
  }

  getChildContext() {
    return di;
  }

  render() {
    return (
      <Component {...this.props}/>
    );
  }
};

export default AppShim;