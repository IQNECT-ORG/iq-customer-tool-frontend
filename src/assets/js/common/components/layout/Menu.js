import React, { Component } from 'react';
import { Link } from 'react-router';

class Menu extends Component {
  render() {
    return (
      <div>
        <ul className="list-unstyled">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/catalogue">Catalogue</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
        </ul>

        <hr/>

        <ul className="list-unstyled">
          <li><Link to="/help">Help</Link></li>
        </ul>
      </div>
    );
  }
};

export default Menu;