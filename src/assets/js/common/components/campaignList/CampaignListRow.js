import React, { Component } from 'react';
import CampaignListThumbnail from './CampaignListThumbnail';

class CampaignListRow extends Component {
  render() {
    return (
      <li>
        <span>
          <CampaignListThumbnail/>
        </span>
        <span>Magazine</span>
        <span>GQ Magazine 01/2016</span>
        <span>31/3/16 - 17/5/16</span>
        <span>Approved</span>
        <span>trash</span>
      </li>
    );
  }
};

export default CampaignListRow;