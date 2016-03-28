import React, { Component } from 'react';
import DrawNav from '../layout/DrawNav';
import DrawNavController from '../hoc/DrawNavController';

class Home extends Component {
  render() {
    return (
      <div>
        <DrawNav
          isOpen={this.props.drawNav.get('isOpen')}
          onToggleMenuClick={this.props.onDrawNavToggleMenuClick}/>
      </div>
    );
  }
};

export default DrawNavController(Home);