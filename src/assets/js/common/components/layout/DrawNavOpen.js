import React, { Component } from 'react';
import { Link } from 'react-router';
import MenuContainer from '../../containers/MenuContainer';
import AccountSummaryContainer from '../../containers/AccountSummaryContainer';
import QuickActions from './QuickActions';
import { FormattedMessage } from 'react-intl';

class DrawNavOpen extends Component {
  render() {
    return (
      <div>
        <nav className="draw-nav draw-nav--open" role="navigation">
          <div className="container-fluid">
            <div className="row m-y-3">
              <div className="col-xs-10 col-xs-offset-1">
                <AccountSummaryContainer/>
              </div>
            </div>

            <hr/>

            <div className="row m-y-2">
              <div className="col-xs-10 col-xs-offset-1">
                <Link to="/campaigns/create" className="btn btn-primary btn-block btn-radius-lg">
                  <FormattedMessage id="app.menu.createCampaign"/>
                </Link>
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