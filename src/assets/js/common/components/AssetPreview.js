import React, { Component } from 'react';

class AssetPreview extends Component {
  render() {
    let core;
    const imageTest = /^image\/(jpeg|png|gif|svg\+xml)$/;

    if(imageTest.test(this.props.type) === true) {
      core = this._renderImage();
    } else {
      core = this._renderIcon();
    }

    return (
      <div className="asset-preview">
        {core}
      </div>
    );
  }

  _renderImage() {
    return (
      <img src={this.props.src}/>
    );
  }

  _renderIcon() {
    return (
      <div>Test</div>
    );
  }
};

export default AssetPreview;