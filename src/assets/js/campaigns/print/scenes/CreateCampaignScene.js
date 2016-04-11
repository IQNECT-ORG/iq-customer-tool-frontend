import React, { Component } from 'react';
import DrawNav from 'app/common/containers/DrawNavContainer';
import SysAlertManager from 'app/common/components/SysAlertManager';
import AuthRequired from 'app/auth/components/hoc/AuthRequired';
import Titlebar from 'app/common/components/layout/Titlebar';
import ui from 'redux-ui/transpiled';

import CreateCampaignContainer from '../containers/CreateCampaignContainer';

class CreateCampaign extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object
    };
  }

  render() {
    return (
      <div>
        <DrawNav/>

        <main className="page-content" role="main">
          <div className="container-fluid">
            <SysAlertManager alerts={this.props.alerts}/>
          </div>

          <div className="container-fluid">
            <div className="row">
              <Titlebar className="col-xs-12">
                <div className="row">
                  <div className="col-xs-12">
                    <h1>Create Campaign</h1>
                  </div>
                </div>
              </Titlebar>
            </div>
          </div>

          <div className="container">
            <CreateCampaignContainer/>
          </div>
        </main>
      </div>
    );
  }
};

let DecoratedComponent = CreateCampaign;

DecoratedComponent = AuthRequired(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);

export default DecoratedComponent;