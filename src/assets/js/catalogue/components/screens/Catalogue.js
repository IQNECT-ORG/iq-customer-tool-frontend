import React, { Component } from 'react';
import DrawNav from 'app/common/components/layout/DrawNav';
import SysAlertManager from 'app/common/components/SysAlertManager';
import AuthRequired from 'app/auth/components/hoc/AuthRequired';
import Titlebar from 'app/common/components/layout/Titlebar';
import FeatureSelectorController from 'app/common/components/hoc/FeatureSelectorController';
import FeatureSelector from 'app/common/components/featureSelector/FeatureSelector';

class Catalogue extends Component {
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
                    <h1>Catalogue</h1>
                  </div>
                </div>
              </Titlebar>
            </div>
          </div>

          <div className="container">
            <FeatureSelector onOptionClick={this.props.onFeatureClick}/>
          </div>
        </main>
      </div>
    );
  }
};

export default AuthRequired(FeatureSelectorController(Catalogue));