import React, { Component } from 'react';

class SysAlertManager extends Component {
  render() {
    if(this.props.errors == null || this.props.errors.length === 0) {
      return null;
    }

    return null; //@TODO: Render alerts. Need to decide what style
  }

  _renderAlert() {
    return (
      <div class="alert alert-success" role="alert">
        <strong>Well done!</strong>
        <span> You successfully read this important alert message.</span>
      </div>
    );
  }
};

export default SysAlertManager;