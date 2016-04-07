import React, { Component } from 'react';
import AssetInput from './AssetInput';
import _ from 'lodash';
import classNames from 'classnames';

class MediaUploaderField extends Component {
  render() {
    const className = classNames('media-uploader', this.props.className, {
      'media-uploader--empty': this.props.value == null,
      'media-uploader--populated': this.props.value
    });

    return (
      <div className={className}>
        <input type="hidden" onChange={this.props.onReferenceChange} name={this.props.name} value={this.props.value}/>
        <AssetInput onChange={this.props.onChange}/>
      </div>
    );
  }
};

export default MediaUploaderField;