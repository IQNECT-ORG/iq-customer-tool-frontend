import React, { Component } from 'react';

class Avatar extends Component {
  render() {
    if(this.props.src) {
      return this._renderImage();
    } else if(this.props.icon) {
      return this._renderIcon();
    } else {
      return this._renderBlank();
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
          <i className={this.props.icon}/>
        </div>
      </div>
    );
  }

  _renderBlank() {
    return (
      <div className="avatar avatar--icon">
        <div className="avatar__icon-container">
          <i className="icons8-globe"/>
        </div>
      </div>
    );
  }
};

export default Avatar;