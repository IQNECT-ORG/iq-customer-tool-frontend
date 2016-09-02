import React, { Component } from 'react';
import AssetField from '../molecules/AssetField';
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
                onChange={this.handleChange.bind(this, void 0)}/>
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
            onChange={this.handleChange.bind(this, void 0)}/>
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
            onChange={this.handleChange.bind(this, index)}/>
        </li>
      );
    });
  }

  handleChange(index, e) {
    // Lets convert the file array to something managable
    let files;
    if(_.isArray(this.props.files)) {
      files = this.props.files.slice(0);
    } else {
      files = [];
    }

    if(index == null) {
      // It isn't trying to replace an exiting item
      files.push(e.target.files);
    } else {
      // Replace
      files[index] = e.target.files;
    }

    this.props.onChange(files);
  }
};

export default MultipleAssetField;