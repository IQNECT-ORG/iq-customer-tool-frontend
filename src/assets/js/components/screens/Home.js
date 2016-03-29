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
          <div className="container-fluid">
            <SysAlertManager alerts={this.props.alerts}/>
          </div>

          <div className="container-fluid">
            <div className="row">
              <Titlebar className="col-xs-12">
                <div className="row">
                  <div className="col-xs-12">
                    <h1>Dashboard</h1>
                  </div>
                </div>
              </Titlebar>
            </div>
          </div>

          <div className="container">
            <form className="form--content">
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
            </form>
          </div>
        </main>
      </div>
    );
  }
};

export default AuthRequired(DrawNavController(Home));