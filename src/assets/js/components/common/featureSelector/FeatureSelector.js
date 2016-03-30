import React, { Component } from 'react';
import _ from 'lodash';
import SelectorList from '../selector/SelectorList';
import FeatureSelectorOption from './FeatureSelectorOption';

class FeatureSelector extends Component {
  render() {
    return (
      <SelectorList
        items={[
          {
            id: 'brands',
            label: 'Brands'
          },
          {
            id: 'campaigns',
            label: 'Campaigns'
          },
          {
            id: 'coupons',
            label: 'Coupons'
          }
        ]}
        renderOption={this._renderOption}
        listItem={{
          className: 'col-xs-4'
        }}/>
    );
  }

  _renderOption(item, index) {
    return (
      <FeatureSelectorOption label={item.label}/>
    );
  }
};

export default FeatureSelector;