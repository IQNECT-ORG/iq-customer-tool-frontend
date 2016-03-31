import React, { Component } from 'react';
import _ from 'lodash';
import SelectorListItem from './SelectorListItem';

class SelectorList extends Component {
  render() {
    return (
      <div className="selector row">
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