import React, { Component } from 'react';
import _ from 'lodash';
import SelectorList from '../selector/SelectorList';
import CampaignTypeSelectorOption from './CampaignTypeSelectorOption';

class CampaignTypeSelector extends Component {
  render() {
    return (
      <SelectorList
        items={[
          {
            id: 1,
            label: 'Magazine Campaign'
          }
        ]}
        renderOption={this._renderOption.bind(this)}
        listItem={{
          className: 'col-xs-4'
        }}/>
    );
  }

  _renderOption(item, index) {
    return (
      <CampaignTypeSelectorOption label={item.label} onOptionClick={ e => this.props.onOptionClick(e, item, index) }/>
    );
  }
};

export default CampaignTypeSelector;