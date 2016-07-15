import React, { Component } from 'react';
import _ from 'lodash';
import SelectorList from './SelectorList';
import CampaignTypeSelectorOption from './CampaignTypeSelectorOption';

class CampaignTypeSelector extends Component {
  render() {
    return (
      <SelectorList
        className="campaign-type-selector"
        items={this.props.campignTypes}
        renderOption={::this._renderOption}
        listItem={{
          className: 'col-xs-4'
        }}/>
    );
  }

  _renderOption(item, index) {
    return (
      <CampaignTypeSelectorOption campaignType={item} onOptionClick={ e => this.props.onOptionClick(e, item, index) }/>
    );
  }
};

export default CampaignTypeSelector;