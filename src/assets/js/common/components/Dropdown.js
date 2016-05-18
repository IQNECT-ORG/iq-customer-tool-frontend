import React, { Component } from 'react';
import ui from 'redux-ui/transpiled';
import classNames from 'classnames';
import _ from 'lodash';

class Dropdown extends Component {
  render() {
    const { props } = this;

    const className = classNames('dropdown', {
      open: props.ui.open === true
    });

    return props.children(
      _.assign({}, props, {
        className: className,
        onTriggerClick: ::this.handleTriggerClick
      })
    );
  }

  handleTriggerClick(e) {
    e.preventDefault();
    this.props.updateUI('open', !this.props.ui.open);
  }
};

let DecoratedComponent = Dropdown;
DecoratedComponent = ui({
  state: {
    open: false
  }
})(DecoratedComponent);

export default DecoratedComponent;