import React, { Component } from 'react';
import CampaignListRow from './CampaignListRow';
import _ from 'lodash';
import CampaignListFilterFormContainer from '../../containers/CampaignListFilterFormContainer';

class CampaignList extends Component {
  render() {
    return (
      <div className="campaign-list m-t-1">
        <div className="pane pane--filled p-a-1">
          <CampaignListFilterFormContainer onFormSubmit={this.props.onFilterSubmit}/>

          <div className="faux-table">
            <div className="faux-table__head row">
              <div className="faux-table__cell col-xs-2">Thumbnail</div>
              <div className="faux-table__cell col-xs-2">Type</div>
              <div className="faux-table__cell col-xs-2">Title</div>
              <div className="faux-table__cell col-xs-2">Period</div>
              <div className="faux-table__cell col-xs-2">Status</div>
            </div>
            <ul className="faux-table__body list-unstyled">
              {this._renderRows()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  _renderRows() {
    return _.map(this.props.campaigns, ::this._renderRow);
  }

  _renderRow(campaign, index) {
    return (
      <CampaignListRow campaign={campaign} key={index} onDeleteClick={
        _ => {
          this.props.onDeleteClick(campaign);
        }
      }/>
    );
  }
};

export default CampaignList;