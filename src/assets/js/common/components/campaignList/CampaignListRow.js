import React, { Component } from 'react';
import CampaignListThumbnail from './CampaignListThumbnail';
import Constants from 'app/common/Constants';

class CampaignListRow extends Component {
  render() {
    const { campaign } = this.props;

    let campaignType;
    switch(campaign.type >> 0) {
      case Constants.CampaignTypes.IMAGE:
        campaignType = 'Image';
        break;
      case Constants.CampaignTypes.PDF:
        campaignType = 'Magazine';
        break;
      case Constants.CampaignTypes.VIDEO:
        campaignType = 'Video';
        break;
    }

    return (
      <li className="campaign-list__row faux-table__row">
        <div className="faux-table__cell col-xs-2">
          <CampaignListThumbnail onClick={this.props.onThumbnailClick}/>
        </div>
        <div className="faux-table__cell col-xs-2">{campaignType}</div>
        <div className="faux-table__cell col-xs-2">{campaign.name}</div>
        <div className="faux-table__cell col-xs-2">NI - NI</div>
        <div className="faux-table__cell col-xs-2">NI</div>
        <div className="faux-table__cell col-xs-2">
          <button
            type="button"
            className="btn btn-secondary-hollow"
            onClick={this.props.onDeleteClick}>
            <i className="icons8-trash"/>
          </button>
        </div>
      </li>
    );
  }
};

export default CampaignListRow;