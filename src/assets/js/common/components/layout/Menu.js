import React, { Component } from 'react';
import { Link } from 'react-router';
import Collapse from 'react-collapse';

class Menu extends Component {
  render() {
    return (
      <div>
        <ul className="list-unstyled">
          <li><Link to="/"><i className="icons8-dashboard"/> Dashboard</Link></li>
          <li>
            <button
              type="button"
              onClick={this.props.toggleSubMenu}>
              <i className="icons8-package"/>
              <span>Catalogue</span>
            </button>
            <Collapse isOpened={this.props.isCatalogueSubmenuOpen}>
              <ul className="list-unstyled">
                <li>
                  <Link to="/catalogue/brands">Brands</Link>
                </li>
                <li>
                  <Link to="/catalogue/campaigns">Campaigns</Link>
                </li>
                <li>
                  <Link to="/catalogue/coupons">Coupons</Link>
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