import React, { Component } from 'react';
import DrawNav from '../../layout/DrawNav';
import DrawNavController from '../../hoc/DrawNavController';
import SysAlertManager from '../../common/SysAlertManager';
import AuthRequired from '../../hoc/AuthRequired';
import Titlebar from '../../layout/Titlebar';
import CreateMagazineCampaignController from '../../hoc/CreateMagazineCampaignController';
import CreateMagazineCampaignForm from '../../common/forms/CreateMagazineCampaignForm';

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
            <CreateMagazineCampaignForm onSubmit={this.props.onCreateMagazineCampaignSubmit}/>
          </div>
        </main>
      </div>
    );
  }
};

export default AuthRequired(DrawNavController(CreateMagazineCampaignController(CreateCampaign)));