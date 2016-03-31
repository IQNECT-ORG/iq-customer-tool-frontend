import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';

class SelectorListItem extends Component {
  render() {
    const className = classNames('selector__list__item', this.props.className);
    return (
      <li className={className}>
        {this.props.children}
      </li>
    );
  }
};

export default SelectorListItem;