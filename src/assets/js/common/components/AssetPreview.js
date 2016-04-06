import React, { Component } from 'react';

class AssetPreview extends Component {
  render() {
    return (
      <div className="asset-preview">
        <img src={this.props.src}/>
      </div>
    );
  }
};

export default AssetPreview;