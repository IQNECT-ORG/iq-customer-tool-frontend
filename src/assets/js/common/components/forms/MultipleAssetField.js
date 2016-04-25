import React, { Component } from 'react';
import AssetField from './AssetField';
import _ from 'lodash';
import classNames from 'classnames';

class MultipleAssetField extends Component {
  render() {
    const className = classNames('multiple-asset-field', this.props.className, {
    });

    return (
      <div className={className}>
        {this._renderInputs()}
        <AssetField onChange={::this.handleChange}/>
      </div>
    );
  }

  _renderInputs() {
    return _.map(this.props.files, (file, index) => {
      return (
        <AssetField key={index} value={file} onChange={::this.handleChange}/>
      );
    });
  }

  handleChange(e) {
    let files;
    if(_.isArray(this.props.files)) {
      files = this.props.files.slice(0);
    } else {
      files = [];
    }
    files.push(e.target.files);
    this.props.onChange(files);
  }
};

export default MultipleAssetField;