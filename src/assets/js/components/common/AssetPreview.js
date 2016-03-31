import React, { Component } from 'react';

class AssetPreview extends Component {
  render() {
    return (
      <div>
        <img src={this.props.src}/>
      </div>
    );
  }
};

export default AssetPreview;