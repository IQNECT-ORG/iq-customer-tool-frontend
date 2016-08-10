import React, { Component } from 'react';
import DrawNavOpen from './DrawNavOpen';
import DrawNavClose from './DrawNavClose';

class DrawNav extends Component {
  componentDidMount() {
    this.updateBodyClass();
  }

  componentDidUpdate() {
    this.updateBodyClass();
  }

  componentWillUnmount() {
    document.body.classList.remove('cmp-draw-nav--open');
  }

  updateBodyClass() {
    if(this.props.isOpen === true) {
      document.body.classList.add('cmp-draw-nav--open');
    } else {
      document.body.classList.remove('cmp-draw-nav--open');
    }
  }

  render() {
    if(this.props.isOpen) {
      return <DrawNavOpen {...this.props}/>;
    }

    return <DrawNavClose {...this.props}/>;
  }
};

export default DrawNav;