import React, { Component } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

class SysAlertManager extends Component {
  render() {
    if(this.props.alerts == null || this.props.alerts.length === 0) {
      return null;
    }

    return this._renderAlert();
  }

  _renderAlert() {
    const alert = _.last(this.props.alerts);

    const className = classNames('alert', `alert-${alert.level}`);
    return (
      <div
        className={className}
        role="alert"
        data-alert-name={alert.name}>
        {alert.message}
      </div>
    );
  }
};

export default SysAlertManager;