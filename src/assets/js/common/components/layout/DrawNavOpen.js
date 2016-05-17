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
            <div className="row m-y-3">
              <div className="col-xs-10 col-xs-offset-1">
                <AccountSummary/>
              </div>
            </div>

            <hr/>

            <div className="row m-y-2">
              <div className="col-xs-10 col-xs-offset-1">
                <Link to="/campaigns/create" className="btn btn-primary btn-block btn-radius-lg">Create Campaign</Link>
              </div>
            </div>

            <hr/>

            <div className="row">
              <div className="col-xs-10 col-xs-offset-1">
                <MenuContainer/>
              </div>
            </div>

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