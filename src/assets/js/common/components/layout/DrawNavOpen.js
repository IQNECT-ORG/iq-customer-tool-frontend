import React, { Component } from 'react';
import { Link } from 'react-router';
import MenuContainer from '../../containers/MenuContainer';
import AccountSummary from './AccountSummary';
import QuickActions from './QuickActions';
import { Motion, spring } from 'react-motion';

class DrawNavOpen extends Component {
  render() {
    return (
      <div>
        <nav className="draw-nav draw-nav--open" role="navigation">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12">
                <AccountSummary/>
              </div>
            </div>

            <hr/>

            <div className="row">
              <div className="col-xs-12">
                <QuickActions/>
              </div>
            </div>

            <hr/>

            <div className="row">
              <div className="col-xs-12">
                <Link to="/campaign/create" className="btn btn-primary btn-block">Create Campaign</Link>
              </div>
            </div>

            <hr/>

            <MenuContainer/>
          </div>
        </nav>
        <div className="draw-nav-overlay hidden-md-up">
          <button type="button" onClick={this.props.actions.close}>
            Close
          </button>
        </div>
      </div>
    );
  }
};

export default DrawNavOpen;