import React, { Component } from 'react';
import { Link } from 'react-router';
import Collapse from 'react-collapse';

class Menu extends Component {
  render() {
    return (
      <div className="draw-nav__menu">
        <ul className="list-unstyled">
          <li><Link to="/"><i className="icons8-dashboard"/> Dashboard</Link></li>
          <li>
            <button
              type="button"
              className="btn-link"
              onClick={this.props.toggleSubMenu}>
              <i className="icons8-package"/>
              <span>Manage</span>
            </button>
            <Collapse isOpened={this.props.isCatalogueSubmenuOpen}>
              <ul className="list-unstyled">
                <li>
                  <Link to="/manage/brands">Brands</Link>
                </li>
                <li>
                  <Link to="/manage/campaigns">Campaigns</Link>
                </li>
                <li>
                  <Link to="/manage/coupons">Coupons</Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li><Link to="/analytics"><i className="icons8-statistics"/> Analytics</Link></li>
        </ul>

        <hr/>

        <ul className="list-unstyled">
          <li><Link to="/help"><i className="icons8-questions"/> Help</Link></li>
        </ul>
      </div>
    );
  }
};

export default Menu;