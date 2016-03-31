import React, { Component } from 'react';
import DrawNav from 'app/common/components/layout/DrawNav';
import DrawNavController from 'app/common/components/hoc/DrawNavController';
import SysAlertManager from 'app/common/components/SysAlertManager';
import AuthRequired from 'app/common/components/hoc/AuthRequired';
import Titlebar from 'app/common/components/layout/Titlebar';

import BrandSelectorController from 'app/common/components/hoc/BrandSelectorController';
import Immutable from 'immutable';
import BrandSelector from 'app/common/components/brandSelector/BrandSelector';

import Tags from 'app/common/components/tag/Tags';
import Avatar from 'app/common/components/Avatar';
import Steptracker from 'app/common/components/Steptracker';

import { FormattedMessage } from 'react-intl';

import { openModal } from 'app/common/actions/modal';

class Home extends Component {
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
                    <Avatar src="http://placehold.it/350x150"/>
                    <Avatar icon="fa fa-times"/>
                    <Steptracker steps={[
                      {
                        label: 'Step 1'
                      },
                      {
                        label: 'Step 2'
                      }
                    ]}/>
                    <h1>Dashboard</h1>
                    <button type="button" onClick={e => this.context.store.dispatch(openModal('addBrand'))}>Add new brand</button>
                  </div>
                </div>
              </Titlebar>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <div className="pane">

                </div>
              </div>

              <div className="col-xs-12 col-sm-6">
                <div className="pane pane--filled">
                  <div className="pane__body">
                    <div className="row">
                      <form className="form--content">
                        <div className="col-xs-12">
                          <h2>Basic Details</h2>

                          <fieldset className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
                          </fieldset>

                          <div className="form-group">
                            <label className="sr-only" htmlFor="exampleInputAmount">Amount (in dollars)</label>
                            <div className="input-group">
                              <div className="input-group-addon">$</div>
                              <input type="text" className="form-control" id="exampleInputAmount" placeholder="Amount"/>
                              <div className="input-group-addon">.00</div>
                            </div>
                              <button type="button" className="btn btn-secondary-outline">Transfer cash</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <BrandSelector
              brands={new Immutable.List([
                new Immutable.Map({
                  id: 1,
                  name: 'test'
                })
              ])}
              onOptionClick={this.props.onBrandClick}/>

              <FormattedMessage
                id='test'
                values={{name: 'Eric'}}/>

              <Tags tags={[
                {
                  text: 'Testing'
                }
              ]}/>
          </div>
        </main>
      </div>
    );
  }
};

export default AuthRequired(BrandSelectorController(DrawNavController(Home)));