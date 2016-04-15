import React, { Component } from 'react';
import CampaignListThumbnail from './CampaignListThumbnail';

class CampaignListRow extends Component {
  render() {
    const { campaign } = this.props;
    return (
      <li>
        <span>
          <CampaignListThumbnail/>
        </span>
        <span>{campaign.type}</span>
        <span>{campaign.name}</span>
        <span>NI - NI</span>
        <span>NI</span>
        <span>trash</span>
      </li>
    );
  }
};

export default CampaignListRow;