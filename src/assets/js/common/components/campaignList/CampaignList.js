import React, { Component } from 'react';
import CampaignListRow from './CampaignListRow';
import _ from 'lodash';
import CampaignListFilterFormContainer from '../../containers/CampaignListFilterFormContainer';

class CampaignList extends Component {
  render() {
    return (
      <div className="campaign-list">
        <CampaignListFilterFormContainer onFormSubmit={this.props.onFilterSubmit}/>

        <div>
          <span>Thumbnail</span>
          <span>Type</span>
          <span>Title</span>
          <span>Period</span>
          <span>Status</span>
        </div>
        <ul className="list-unstyled">
          {this._renderRows()}
        </ul>
      </div>
    );
  }
  _renderRows() {
    return _.map(this.props.campaigns, this._renderRow);
  }

  _renderRow(item, index) {
    return (
      <CampaignListRow key={index}/>
    );
  }
};

export default CampaignList;