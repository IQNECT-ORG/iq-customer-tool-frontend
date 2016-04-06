import React, { Component } from 'react';
import AssetInput from './AssetInput';
import AssetPreview from '../../containers/AssetPreviewContainer';
import _ from 'lodash';

class AssetField extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.props.onRemoveClick}>
          Remove
        </button>
        <AssetInput onChange={this.props.onChange} value={this.props.value}/>
        {this._renderPreviews()}
      </div>
    );
  }

  _renderPreviews() {
    return _.map(this.props.value, (source, index) => {
      return (
        <AssetPreview src={source} key={index}/>
      );
    });
  }
};

export default AssetField;