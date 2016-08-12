import React, { Component } from 'react';
import { Link } from 'react-router';
import Collapse from 'react-collapse';
import { FormattedMessage } from 'react-intl';

class Menu extends Component {
  render() {
    return (
      <div className="draw-nav__menu">
        <ul className="list-unstyled">
          <li>
            <Link to="/">
              <i className="icons8-dashboard"/>
              <FormattedMessage id="app.menu.dashboard"/>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="btn-link"
              onClick={this.props.onToggleSubMenuClick}>
              <i className="icons8-package"/>
              <FormattedMessage id="app.menu.catalogue"/>
            </button>
            <Collapse className="draw-nav__sub-menu" isOpened={this.props.isCatalogueSubmenuOpen}>
              <ul className="list-unstyled">
                <li>
                  <Link to="/manage/brands">
                    <img src="/assets/images/bullet-icon-default.svg"/>
                    <FormattedMessage id="app.menu.brands"/>
                  </Link>
                </li>
                <li>
                  <Link to="/manage/campaigns">
                    <img src="/assets/images/bullet-icon-default.svg"/>
                    <FormattedMessage id="app.menu.campaigns"/>
                  </Link>
                </li>
                <li>
                  <Link to="/manage/coupons">
                    <img src="/assets/images/bullet-icon-default.svg"/>
                    <FormattedMessage id="app.menu.coupons"/>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/analytics">
              <i className="icons8-statistics"/>
              <FormattedMessage id="app.menu.analytics"/>
            </Link>
          </li>
        </ul>

        <hr/>

        <ul className="list-unstyled">
          <li>
            <a href="https://iqnect.freshdesk.com/support/solutions" target="_blank">
              <i className="icons8-questions"/>
              <FormattedMessage id="app.menu.help"/>
            </a>
          </li>
          <li>
            <button type="button" className="btn btn-link" onClick={this.props.onLogoutClick}>
              <i className="icons8-settings"/>
              <FormattedMessage id="app.menu.logout"/>
            </button>
          </li>
        </ul>
      </div>
    );
  }
};

export default Menu;