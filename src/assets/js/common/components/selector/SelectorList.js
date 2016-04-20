import React, { Component } from 'react';
import _ from 'lodash';
import SelectorListItem from './SelectorListItem';
import classNames from 'classnames';

class SelectorList extends Component {
  render() {
    const className = classNames('selector row', this.props.className);
    return (
      <div className={className}>
        <ul className="selector__list list-unstyled clearfix">
          {this._renderItems()}
        </ul>
      </div>
    );
  }

  _renderItems() {
    return _.map(this.props.items, (item, index, collection) => {
      return this._renderRow(item, index);
    });
  }

  _renderRow(item, index, collection) {
    return (
      <SelectorListItem
        key={index}
        item={item}
        onOptionClick={this.props.onOptionClick}
        {...this.props.listItem}>
        {this.props.renderOption(item, index, collection)}
      </SelectorListItem>
    );
  }
};

export default SelectorList;