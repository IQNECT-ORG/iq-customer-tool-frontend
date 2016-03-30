import React, { Component } from 'react';
import _ from 'lodash';
import SelectorList from '../selector/SelectorList';

class BrandSelectorOptions extends Component {
  render() {
    return (
      <div className="selector__option">
        <button type="button" onClick={this.props.onOptionClick}>
          {this.props.label}
        </button>
      </div>
    );
  }
};

export default BrandSelectorOptions;