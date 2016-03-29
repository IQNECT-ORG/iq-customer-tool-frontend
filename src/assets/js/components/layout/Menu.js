import React, { Component } from 'react';
import { Link } from 'react-router';

class Menu extends Component {
  render() {
    return (
      <div>
        <ul className="list-unstyled">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/">Catalogue</Link></li>
          <li><Link to="/">Analytics</Link></li>
        </ul>

        <hr/>

        <ul className="list-unstyled">
          <li><Link to="/">Help</Link></li>
        </ul>
      </div>
    );
  }
};

export default Menu;