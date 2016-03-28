import React, { Component } from 'react';
import DrawNav from '../layout/DrawNav';
import DrawNavController from '../hoc/DrawNavController';
import SysAlertManager from '../common/SysAlertManager';
import AuthRequired from '../hoc/AuthRequired';

class Home extends Component {
  render() {
    return (
      <div>
        <SysAlertManager alerts={this.props.alerts}/>
        <DrawNav
          isOpen={this.props.drawNav.get('isOpen')}
          onToggleMenuClick={this.props.onDrawNavToggleMenuClick}/>
      </div>
    );
  }
};

export default AuthRequired(DrawNavController(Home));