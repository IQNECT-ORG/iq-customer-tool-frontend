import React, { Component } from 'react';

class DrawNavClose extends Component {
  render() {
    return (
      <nav className="draw-nav" role="navigation">
        <div className="container">
          <button type="button" onClick={this.props.actions.open}>
            Open
          </button>
        </div>
      </nav>
    );
  }
};

export default DrawNavClose;