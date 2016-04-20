import React, { Component } from 'react';
import CampaignListThumbnail from './CampaignListThumbnail';

class CampaignListRow extends Component {
  render() {
    const { campaign } = this.props;
    return (
      <li className="faux-table__row">
        <div className="faux-table__cell col-xs-2">
          <CampaignListThumbnail/>
        </div>
        <div className="faux-table__cell col-xs-2">{campaign.type}</div>
        <div className="faux-table__cell col-xs-2">{campaign.name}</div>
        <div className="faux-table__cell col-xs-2">NI - NI</div>
        <div className="faux-table__cell col-xs-2">NI</div>
        <div className="faux-table__cell col-xs-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.props.onDeleteClick}>
            Delete
          </button>
        </div>
      </li>
    );
  }
};

export default CampaignListRow;