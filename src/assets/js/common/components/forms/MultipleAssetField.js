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
        <AssetField onChange={::this.handleChange}/>
        <ul className="list-unstyled row">
          {this._renderInputs()}
        </ul>
      </div>
    );
  }

  _renderInputs() {
    return _.map(this.props.files, (file, index) => {
      return (
        <li key={index} className="col-xs-6 aspect-1-1-container">
          <AssetField className="aspect-item" value={file} onChange={::this.handleChange}/>
        </li>
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