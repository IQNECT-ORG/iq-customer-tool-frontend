import React, { Component } from 'react';

class AssetInput extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={::this.handleBrowseClick}>
          Upload Artwork
        </button>
        <input type="file" ref="input" onChange={this.props.onChange} hidden/>
      </div>
    );
  }

  handleBrowseClick(e) {
    this.refs.input.click();
  }
};

export default AssetInput;