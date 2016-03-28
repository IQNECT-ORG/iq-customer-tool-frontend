import React, { Component } from 'react';
import { Link } from 'react-router';

class Menu extends Component {
  render() {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
    );
  }
};

export default Menu;