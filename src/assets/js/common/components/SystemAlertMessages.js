import React, { Component } from 'react';

class SysAlertManager extends Component {
  render() {
    if(this.props.alerts == null || this.props.alerts.length === 0) {
      return null;
    }

    return this._renderAlert();
  }

  _renderAlert() {
    return (
      <div className={`alert alert-${this.props.alerts[0].level}`} role="alert">
        {this.props.alerts[0].message}
      </div>
    );
  }
};

export default SysAlertManager;