import React, { Component } from 'react';
import _ from 'lodash';
import GalleryListItem from './GalleryListItem';

class GalleryList extends Component {
  render() {
    return (
      <ul className="gallery__list list-unstyled row">
        {this._renderItems()}
      </ul>
    );
  }

  _renderItems() {
    return _.map(this.props.items, this._renderItem, this);
  }

  _renderItem(item, index) {
    return (
      <GalleryListItem
        key={index}
        src={item}
        onClick={e => this.props.onClick(e, item, index)}/>
    );
  }
};

export default GalleryList;