import React, { Component } from 'react';
import _ from 'lodash';

class BrandSelectorOptions extends Component {
  render() {
    return (
      <div className="selector__option">
        <button type="button" onClick={this.props.onOptionClick}>
          <img src={this.props.imgSrc}/>
        </button>
      </div>
    );
  }
};

export default BrandSelectorOptions;