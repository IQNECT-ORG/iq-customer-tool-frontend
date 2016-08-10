import React, { Component } from 'react';

class DrawNavClose extends Component {
  render() {
    return (
      <nav className="draw-nav" role="navigation">
        <button className="draw-nav__opener" type="button" onClick={this.props.actions.open}>
          <i className="icons8-menu"/>
        </button>
      </nav>
    );
  }
};

export default DrawNavClose;