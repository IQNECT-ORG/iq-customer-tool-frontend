import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AssetInput extends Component {
  render() {
    return (
      <div className="asset-input" onDragOver={::this.handleDragOver} onDrop={::this.handleDrop}>
        <button className="asset-input__btn" type="button" onClick={::this.handleBrowseClick}>
          <i className="icons8-dashboard"/>
          <span>Upload Artwork</span>
        </button>
        <input
          className="asset-input__input"
          type="file"
          ref="input"
          name={this.props.name}
          onChange={this.props.onChange}
          hidden/>
      </div>
    );
  }

  handleBrowseClick(e) {
    this.refs.input.click();
  }

  handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    // @TODO: Move this into a ui container
    this.refs.input.files = e.dataTransfer.files;
  }
};

export default AssetInput;