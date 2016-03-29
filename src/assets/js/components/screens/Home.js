import React, { Component } from 'react';
import DrawNav from '../layout/DrawNav';
import DrawNavController from '../hoc/DrawNavController';
import SysAlertManager from '../common/SysAlertManager';
import AuthRequired from '../hoc/AuthRequired';
import Titlebar from '../layout/Titlebar';

class Home extends Component {
  render() {
    return (
      <div>
        <DrawNav
          isOpen={this.props.drawNav.get('isOpen')}
          onToggleMenuClick={this.props.onDrawNavToggleMenuClick}/>

        <main className="page-content" role="main">
          <SysAlertManager alerts={this.props.alerts}/>
          <Titlebar/>
        </main>
      </div>
    );
  }
};

export default AuthRequired(DrawNavController(Home));