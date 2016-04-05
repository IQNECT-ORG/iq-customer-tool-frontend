import React, { Component } from 'react';
import { Link } from 'react-router';

class Menu extends Component {
  render() {
    return (
      <div>
        <ul className="list-unstyled">
          <li><Link to="/"><i className="icons8-dashboard"/> Dashboard</Link></li>
          <li><Link to="/catalogue"><i className="icons8-package"/> Catalogue</Link></li>
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