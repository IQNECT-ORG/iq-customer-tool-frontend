import React, { Component } from 'react';
import AssetInput from './AssetInput';
import AssetPreview from '../../containers/AssetPreviewContainer';
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