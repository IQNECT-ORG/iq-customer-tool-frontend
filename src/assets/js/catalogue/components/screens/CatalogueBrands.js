import React, { Component } from 'react';
import DrawNav from 'app/common/components/layout/DrawNav';
import DrawNavController from 'app/common/components/hoc/DrawNavController';
import SysAlertManager from 'app/common/components/SysAlertManager';
import AuthRequired from 'app/auth/components/hoc/AuthRequired';
import Titlebar from 'app/common/components/layout/Titlebar';
import BrandSelectorController from 'app/common/components/hoc/BrandSelectorController';
import BrandSelector from 'app/common/components/brandSelector/BrandSelector';
import Immutable from 'immutable';

class CatalogueBrands extends Component {
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
                    <h1>Catalogue / Brands</h1>
                  </div>
                </div>
              </Titlebar>
            </div>
          </div>

          <div className="container">
            <BrandSelector
              brands={new Immutable.List(new Immutable.Map({
                name: 'hello'
              }))}
              onOptionClick={this.props.onBrandClick}/>
          </div>
        </main>
      </div>
    );
  }
};

export default AuthRequired(DrawNavController(BrandSelectorController(CatalogueBrands)));