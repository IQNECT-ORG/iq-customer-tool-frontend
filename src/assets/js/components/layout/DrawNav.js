import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './Menu';
import AccountSummary from './AccountSummary';
import {Motion, spring} from 'react-motion';

class DrawNav extends Component {
  render() {
    return (
      <Motion style={{x: spring(this.props.isOpen ? 400 : 0)}}>
        {({x}) =>
          <nav role="navigation" style={{
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }}>
            <button type="button" onClick={this.props.onToggleMenuClick}>Toggle Menu</button>
            <AccountSummary/>
            <Menu/>
          </nav>
        }
      </Motion>
    );
  }
};

export default DrawNav;