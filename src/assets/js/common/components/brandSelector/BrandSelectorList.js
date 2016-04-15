import React, { Component } from 'react';
import _ from 'lodash';
import SelectorList from '../selector/SelectorList';
import BrandSelectorOption from './BrandSelectorOption';

class BrandSelector extends Component {
  render() {
    return (
      <SelectorList
        items={this.props.brands}
        renderOption={::this._renderOption}
        listItem={{
          className: 'col-xs-2'
        }}/>
    );
  }

  _renderOption(brand, index) {
    return (
      <BrandSelectorOption
        imgSrc={brand.imgPreview}
        onOptionClick={ e => this.props.onOptionClick(e, brand, index) }/>
    );
  }
};

export default BrandSelector;