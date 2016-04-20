import React, { Component } from 'react';
import _ from 'lodash';
import Constants from 'app/common/Constants';

class CampaignTypeSelectorOptions extends Component {
  render() {
    let label;
    let icon;

    switch(this.props.campaignType) {
      case Constants.CampaignTypes.IMAGE:
        icon = 'icons8-dashboard';
        label = 'Create Image Campaign';
        break;
      case Constants.CampaignTypes.VIDEO:
        icon = 'icons8-statistics';
        label = 'Create Video Campaign';
        break;
      case Constants.CampaignTypes.PDF:
        icon = 'icons8-questions';
        label = 'Create Magazine Campaign';
        break;
    }

    return (
      <div className="selector__option">
        <button type="button" onClick={this.props.onOptionClick}>
          <i className={icon}/>
          <div>{label}</div>
        </button>
      </div>
    );
  }
};

export default CampaignTypeSelectorOptions;