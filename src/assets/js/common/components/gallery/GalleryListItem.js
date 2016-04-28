import React, { Component } from 'react';

class GalleryListItem extends Component {
  render() {
    return (
      <li className="gallery__list__item col-xs-4 aspect-1-1-container m-b-g">
        <div className="aspect-item">
          <button type="button" onClick={this.props.onClick}>
            <img src={this.props.src}/>
          </button>
        </div>
      </li>
    );
  }
};

export default GalleryListItem;