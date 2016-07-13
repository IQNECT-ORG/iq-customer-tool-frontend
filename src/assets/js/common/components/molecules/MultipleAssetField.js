import React, { Component } from 'react';
import AssetField from './AssetField';
import _ from 'lodash';
import classNames from 'classnames';

class MultipleAssetField extends Component {
  render() {
    const className = classNames('multiple-asset-field', this.props.className, {
    });

    if(this.props.files.length) {
      return (
        <div className={className}>
          <ul className="list-unstyled row">
            <li className="col-xs-6 aspect-1-1-container">
              <AssetField
                className="aspect-item"
                label={this.props.label}
                icon={this.props.icon}
                onChange={::this.handleChange}/>
            </li>
            {this._renderInputs()}
          </ul>
        </div>
      );
    } else {
      return (
        <div className={className}>
          <AssetField
            label={this.props.label}
            icon={this.props.icon}
            onChange={::this.handleChange}/>
        </div>
      );
    }
  }

  _renderInputs() {
    return _.map(this.props.files, (file, index) => {
      return (
        <li key={index} className="col-xs-6 aspect-1-1-container">
          <AssetField
            className="aspect-item"
            value={file}
            onChange={::this.handleChange}/>
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