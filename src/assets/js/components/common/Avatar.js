import React, { Component } from 'react';

class Avatar extends Component {
  render() {
    if(this.props.src) {
      return this._renderImage();
    } else if(this.props.icon) {
      return this._renderIcon();
    }
  }

  _renderImage() {
    return (
      <div className="avatar avatar--image">
        <div className="avatar__image-container">
          <img src={this.props.src}/>
        </div>
      </div>
    );
  }

  _renderIcon() {
    return (
      <div className="avatar avatar--icon">
        <div className="avatar__icon-container">
          <span>Icon</span>
        </div>
      </div>
    );
  }
};

export default Avatar;