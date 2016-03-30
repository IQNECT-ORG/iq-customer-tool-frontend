import React, { Component } from 'react';
import _ from 'lodash';
import SelectorList from '../selector/SelectorList';

class FeatureSelectorOptions extends Component {
  render() {
    return (
      <div className="selector__option">
        <button type="button">
          {this.props.label}
        </button>
      </div>
    );
  }
};

export default FeatureSelectorOptions;