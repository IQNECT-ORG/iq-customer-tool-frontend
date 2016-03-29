import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Titlebar extends Component {
  render() {
    const className = classNames('titlebar clearfix', this.props.className);
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
};

export default Titlebar;