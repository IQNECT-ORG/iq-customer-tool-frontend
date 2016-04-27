import React, { Component } from 'react';
import classNames from 'classnames';

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
    const className = classNames('avatar avatar--image', this.props.className);
    return (
      <div className={className}>
        <div className="avatar__image-container">
          <img src={this.props.src}/>
        </div>
      </div>
    );
  }

  _renderIcon() {
    const className = classNames('avatar avatar--icon', this.props.className);
    return (
      <div className={className}>
        <div className="avatar__icon-container">
          <i className={this.props.icon}/>
        </div>
      </div>
    );
  }

  _renderBlank() {
    const className = classNames('avatar avatar--blank', this.props.className);
    return (
      <div className={className}>
        <div className="avatar__icon-container">
          <i className="icons8-globe"/>
        </div>
      </div>
    );
  }
};

export default Avatar;