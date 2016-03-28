import React, { Component } from 'react';
import { Link } from 'react-router';
import Menu from './Menu';
import AccountSummary from './AccountSummary';
import {Motion, spring} from 'react-motion';

class DrawNav extends Component {
  render() {
    return (
      <Motion style={{x: spring(this.props.isOpen ? 0 : -400)}}>
        {({x}) =>
          <nav className="draw-nav" role="navigation" style={{
            WebkitTransform: `translate3d(${x}px, 0, 0)`,
            transform: `translate3d(${x}px, 0, 0)`,
          }}>
            <AccountSummary/>

            <div>
              <span>Notications</span>
              <span>Settings</span>
            </div>

            <Link to="/">Create Campaign</Link>

            <Menu/>
          </nav>
        }
      </Motion>
    );
  }
};

export default DrawNav;