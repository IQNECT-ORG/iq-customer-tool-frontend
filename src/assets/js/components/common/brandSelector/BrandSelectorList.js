import React, { Component } from 'react';
import _ from 'lodash';
import BrandSelectorListItem from './BrandSelectorListItem';

class BrandSelectorList extends Component {
  render() {
    return (
      <div className="brand-selector row">
        <ul className="brand-selector__list list-unstyled">
          {this._renderBrands()}
        </ul>
      </div>
    );
  }

  _renderBrands() {
    // Using lodash to do this otherwise it would be an immutable result
    return _.map(this.props.brands.toArray(), brand => {
      return (
        <BrandSelectorListItem
          key={brand.get('id')}
          brand={brand}
          className="col-xs-2"
          onBrandClick={this.props.onBrandClick}/>
      );
    });
  }
};

export default BrandSelectorList;