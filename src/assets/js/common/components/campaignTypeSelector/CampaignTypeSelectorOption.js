import React, { Component } from 'react';
import _ from 'lodash';
import Constants from 'app/common/Constants';

class CampaignTypeSelectorOptions extends Component {
  render() {
    let label;
    let icon;

    switch(this.props.campaignType) {
      case Constants.CampaignTypes.IMAGE:
        icon = 'icons8-picture';
        label = <div>Create Image<br/>Campaign</div>;
        break;
      case Constants.CampaignTypes.VIDEO:
        icon = 'icons8-movie';
        label = <div>Create Video<br/>Campaign</div>;
        break;
      case Constants.CampaignTypes.PDF:
        icon = 'icons8-magazine';
        label = <div>Create Magazine<br/>Campaign</div>;
        break;
    }

    return (
      <div className="selector__option">
        <button type="button" onClick={this.props.onOptionClick}>
          <i className={icon}/>
          {label}
        </button>
      </div>
    );
  }
};

export default CampaignTypeSelectorOptions;