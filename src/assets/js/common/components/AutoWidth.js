import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class AutoWidth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: null
    };
  }

  componentDidMount() {
    this._updateWidth();
    window.addEventListener('resize', ::this.handleWindowResize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.width === nextState.width) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    this._updateWidth();
  }

  _updateWidth() {
    const node = ReactDOM.findDOMNode(this);
    const width = Math.floor(parseFloat(getComputedStyle(node).width));

    this.setState({
      width
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  render() {
    let children;

    if(_.isFunction(this.props.children)) {
      children = this.props.children(
        _.assign({}, this.props, {
          autoWidth: this.state.width
        })
      );
    } else {
      children = React.Children.map(this.props.children, child => {
        return React.cloneElement(
          child,
          _.assign({}, this.props, {
            autoWidth: this.state.width
          })
        );
      })
    }

    if(this.props.dryRun === true) {
      if(this.state.width == null) {
        return <div className="auto-width"/>;
      }
    }

    return (
      <div className="auto-width">
        {children}
      </div>
    );
  }

  handleWindowResize(e) {
    this._updateWidth();
  }
};

export default AutoWidth;