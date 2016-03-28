import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './Menu';

class DrawNav extends Component {
  render() {
    return (
      <nav role="navigation">
        <Menu/>
      </nav>
    );
  }
};

export default DrawNav;