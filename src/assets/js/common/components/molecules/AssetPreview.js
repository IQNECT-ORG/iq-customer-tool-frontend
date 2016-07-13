import React, { Component } from 'react';
import classNames from 'classnames';

class AssetPreview extends Component {
  render() {
    let core;
    const imageTest = /^image\/(jpeg|png|gif|svg\+xml)$/;
    const videoTest = /^video\//;

    let className;

    if(imageTest.test(this.props.type) === true) {
      core = this._renderImage();
      className = classNames('asset-preview', 'asset-preview--image');
    } else if(videoTest.test(this.props.type) === true) {
      core = this._renderVideo();
      className = classNames('asset-preview', 'asset-preview--video');
    } else {
      core = this._renderIcon();
      className = classNames('asset-preview', 'asset-preview--icon');
    }

    return (
      <div className={className}>
        {core}
      </div>
    );
  }

  _renderImage() {
    return (
      <img src={this.props.src}/>
    );
  }

  _renderVideo() {
    return (
      <video src={this.props.src} autoPlay={true} controls={false} muted={true} loop={true}>
      </video>
    );
  }

  _renderIcon() {
    return (
      <div>
        <i className="icons8-pdf-2"/>
      </div>
    );
  }
};

export default AssetPreview;