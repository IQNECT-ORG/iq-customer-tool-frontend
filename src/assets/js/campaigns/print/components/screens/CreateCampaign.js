import React, { Component } from 'react';
import DrawNav from 'app/common/components/layout/DrawNav';
import DrawNavController from 'app/common/components/hoc/DrawNavController';
import SysAlertManager from 'app/common/components/SysAlertManager';
import AuthRequired from 'app/common/components/hoc/AuthRequired';
import Titlebar from 'app/common/components/layout/Titlebar';
import CreateMagazineCampaignController from 'app/common/components/hoc/CreateMagazineCampaignController';
import BasicDetailsForm from '../forms/BasicDetailsForm';

class CreateCampaign extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object
    };
  }

  render() {
    return (
      <div>
        <DrawNav
          isOpen={this.props.drawNav.get('isOpen')}
          onToggleMenuClick={this.props.onDrawNavToggleMenuClick}/>

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
            <BasicDetailsForm onSubmit={this.props.onCreateMagazineCampaignSubmit}/>
          </div>
        </main>
      </div>
    );
  }
};

export default AuthRequired(DrawNavController(CreateMagazineCampaignController(CreateCampaign)));