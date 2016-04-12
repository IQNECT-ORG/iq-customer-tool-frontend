import React, { Component } from 'react';
import DrawNav from 'app/common/containers/DrawNavContainer';
import SystemAlertMessagesContainer from 'app/common/containers/SystemAlertMessagesContainer';

class DefaultLayout extends Component {
  render() {
    return (
      <div>
        <DrawNav/>

        <main className="page-content" role="main">
          <div className="container-fluid">
            <SystemAlertMessagesContainer/>
          </div>

          <div>
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
};

export default DefaultLayout;