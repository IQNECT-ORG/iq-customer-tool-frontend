import React, { Component } from 'react';
import _ from 'lodash';

class BrandSelectorOptions extends Component {
  render() {
    return (
      <div className="selector__option">
        <button type="button" onClick={this.props.onOptionClick}>
          {this._renderCore()}
        </button>
        <button type="button">
          <span>View</span>
        </button>
        <button type="button">
          <span>Edit</span>
        </button>
      </div>
    );
  }

  _renderCore() {
    if(this.props.imgSrc == null) {
      return (
        <span>{this.props.label}</span>
      );
    }

    return (
      <img src={this.props.imgSrc}/>
    );

  }
};

export default BrandSelectorOptions;