import React, { Component } from 'react';

class SysAlertManager extends Component {
  render() {
    if(this.props.alerts == null || this.props.alerts.size === 0) {
      return null;
    }

    return this._renderAlert();
  }

  _renderAlert() {
    return (
      <div className={`alert alert-${this.props.alerts.get(0).get('level')}`} role="alert">
        {this.props.alerts.get(0).get('message')}
      </div>
    );
  }
};

export default SysAlertManager;