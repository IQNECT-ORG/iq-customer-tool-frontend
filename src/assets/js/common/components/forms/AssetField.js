import React, { Component } from 'react';
import AssetInput from './AssetInput';
import LocalFileAssetPreviewContainer from '../../containers/LocalFileAssetPreviewContainer';
import _ from 'lodash';
import classNames from 'classnames';

class AssetField extends Component {
  render() {
    const className = classNames('asset-field', this.props.className, {
      'asset-field--empty': this.props.value == null || this.props.value.length === 0,
      'asset-field--populated': this.props.value && this.props.value.length
    });

    return (
      <div className={className}>
        {this._renderPreviews()}
        <AssetInput name={this.props.name} onChange={this.props.onChange} value={this.props.value}/>
      </div>
    );
  }

  _renderPreviews() {
    return _.map(this.props.value, (source, index) => {
      return (
        <LocalFileAssetPreviewContainer src={source} key={index}/>
      );
    });
  }
};

export default AssetField;