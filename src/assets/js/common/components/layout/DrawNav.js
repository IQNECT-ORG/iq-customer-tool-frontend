import React, { Component } from 'react';
import { Link } from 'react-router';
import MenuContainer from '../../containers/MenuContainer';
import AccountSummary from './AccountSummary';
import QuickActions from './QuickActions';
import { Motion, spring } from 'react-motion';

class DrawNav extends Component {
  render() {
    return (
      <Motion style={{x: spring(this.props.isOpen ? 0 : -400)}}>
        {({x}) =>
          <nav className="draw-nav" role="navigation" style={{
            WebkitTransform: `translate3d(${x}px, 0, 0)`,
            transform: `translate3d(${x}px, 0, 0)`,
          }}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-12">
                  <AccountSummary/>
                </div>
              </div>

              <hr/>

              <div className="row">
                <div className="col-xs-12">
                  <QuickActions/>
                </div>
              </div>

              <hr/>

              <div className="row">
                <div className="col-xs-12">
                  <Link to="/campaign/create" className="btn btn-primary btn-block">Create Campaign</Link>
                </div>
              </div>

              <hr/>

              <MenuContainer/>
            </div>
          </nav>
        }
      </Motion>
    );
  }
};

export default DrawNav;