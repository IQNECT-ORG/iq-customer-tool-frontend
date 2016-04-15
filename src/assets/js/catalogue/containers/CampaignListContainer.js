import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignList from 'app/common/components/campaignList/CampaignList';
import ui from 'redux-ui/transpiled';
import { fetchCampaigns, deleteCampaign } from 'app/common/actions/campaigns';
import { getCampaigns } from 'app/core/selectors/entities/campaigns';
import _ from 'lodash';

class CampaignListContainer extends Component {

  componentDidMount() {
    this.props.actions.fetchCampaigns();
  }

  render() {
    return (
      <CampaignList {...this.props}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const filteredCampaigns = _.filter(getCampaigns(state), campaign => {
    if(ownProps.ui.filter == null) {
      return true;
    }
    return campaign.name === ownProps.ui.filter;
  });

  return {
    campaigns: filteredCampaigns
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      fetchCampaigns: () => {
        dispatch(fetchCampaigns());
      }
    },
    onFilterSubmit: (values) => {
      ownProps.updateUI('filter', values.filter);
    },
    onDeleteClick: (campaign) => {
      dispatch(deleteCampaign(campaign.campaignId));
    }
  };
}

let DecoratedComponent = CampaignListContainer;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'campaignList',
  state: {
    filter: null
  }
})(DecoratedComponent);

export default DecoratedComponent;