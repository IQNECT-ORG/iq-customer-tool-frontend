import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './Menu';
import AccountSummary from './AccountSummary';

class DrawNav extends Component {
  render() {
    return (
      <nav role="navigation">
        <AccountSummary/>
        <Menu/>
      </nav>
    );
  }
};

export default DrawNav;