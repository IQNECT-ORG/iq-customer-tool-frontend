import React, { Component } from 'react';
import _ from 'lodash';

class FeatureSelectorOptions extends Component {
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

export default FeatureSelectorOptions;