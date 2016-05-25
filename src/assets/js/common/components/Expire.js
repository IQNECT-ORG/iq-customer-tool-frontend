import React, { Component } from 'react';
import _ from 'lodash';

class Expire extends Component {

  static get propTypes() {
    return {
      onReset: React.PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      onReset: _.noop
    };
  }

  componentWillReceiveProps(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.props.onReset();
      this._setTimer();
    }
  }

  componentDidMount() {
    this._setTimer();
  }

  _setTimer() {
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;

    // hide after `delay` milliseconds
    this._timer = setTimeout(() => {
      this.props.onExpire();
      this._timer = null;
    }, this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  render() {
    return this.props.expired
      ? null
      : <div>{this.props.children}</div>;
  }
}

export default Expire;