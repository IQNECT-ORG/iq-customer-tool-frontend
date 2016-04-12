import React, { Component } from 'react';
import _ from 'lodash';
import SelectorList from '../selector/SelectorList';
import BrandSelectorOption from './BrandSelectorOption';

class BrandSelector extends Component {
  render() {
    return (
      <SelectorList
        items={this.props.brands}
        renderOption={this._renderOption.bind(this)}
        listItem={{
          className: 'col-xs-2'
        }}/>
    );
  }

  _renderOption(item, index) {
    return (
      <BrandSelectorOption label={item.label} onOptionClick={ e => this.props.onOptionClick(e, item, index) }/>
    );
  }
};

export default BrandSelector;