import React, { Component } from 'react';
import { connect } from 'react-redux';
import CampaignList from 'app/common/components/campaignList/CampaignList';
import ui from 'redux-ui/transpiled';
import campaignActions from 'app/common/actions/campaigns';
import { getCampaigns } from 'app/core/selectors/entities/campaigns';
import { getTriggers } from 'app/core/selectors/entities/triggers';
import _ from 'lodash';
import { push } from 'react-router-redux/lib/actions';

const mapStateToProps = (state, ownProps) => {
  let filteredCampaigns = _.filter(getCampaigns(state), campaign => {
    if(ownProps.ui.filter == null) {
      return true;
    }
    return _.includes(_.lowerCase(campaign.name), _.lowerCase(ownProps.ui.filter));
  });

  let triggers = getTriggers(state);

  let campaigns = _.map(filteredCampaigns, campaign => {
    const trigger = _.find(triggers, x => x.campaignId === campaign.campaignId);

    if(trigger == null) {
      return campaign;
    }

    return _.assign({}, campaign, {
      thumbnail: trigger.imgPreview
    });
  });

  return {
    campaigns
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      fetchCampaigns: () => {
        dispatch(campaignActions.fetch());
      }
    },
    onFilterSubmit: (values) => {
      ownProps.updateUI('filter', values.filter);
    },
    onDeleteClick: (campaign) => {
      dispatch(deleteCampaign(campaign.campaignId));
    },
    onThumbnailClick: (campaign) => {
      dispatch(push(`/campaigns/edit/${campaign.campaignId}`));
    }
  };
}

let DecoratedComponent = CampaignList;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'campaignList',
  state: {
    filter: null
  }
})(DecoratedComponent);

export default DecoratedComponent;