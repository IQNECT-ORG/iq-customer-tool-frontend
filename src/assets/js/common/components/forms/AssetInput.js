import React, { Component } from 'react';

class AssetInput extends Component {
  render() {
    return (
      <div className="asset-input">
        <button className="asset-input__btn" type="button" onClick={::this.handleBrowseClick}>
          <i className="icons8-dashboard"/>
          <span>Upload Artwork</span>
        </button>
        <input className="asset-input__input" type="file" ref="input" onChange={this.props.onChange} hidden/>
      </div>
    );
  }

  handleBrowseClick(e) {
    this.refs.input.click();
  }
};

export default AssetInput;