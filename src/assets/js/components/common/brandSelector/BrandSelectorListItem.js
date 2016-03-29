import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';

class BrandSelectorListItem extends Component {
  render() {
    const className = classNames('brand-selector__list__item', this.props.className);
    return (
      <li className={className}>
        <div className="brand-selector__brand">
          <button type="button" onClick={this.props.onBrandClick}>
            {this.props.brand.get('name')}
          </button>
        </div>
      </li>
    );
  }
};

export default BrandSelectorListItem;