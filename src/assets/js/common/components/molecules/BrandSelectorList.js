import React, { Component } from 'react';
import _ from 'lodash';
import SelectorList from './SelectorList';
import BrandSelectorOption from './BrandSelectorOption';

class BrandSelector extends Component {
  render() {
    return (
      <SelectorList
        className="brand-selector"
        items={this.props.brands}
        renderOption={::this._renderOption}
        listItem={{
          className: 'col-xs-12 col-sm-6 col-md-4 col-lg-2'
        }}/>
    );
  }

  _renderOption(brand, index) {
    return (
      <BrandSelectorOption
        imgSrc={brand.imgPreview}
        label={brand.name}
        onOptionClick={ e => this.props.onOptionClick(e, brand, index) }/>
    );
  }
};

export default BrandSelector;