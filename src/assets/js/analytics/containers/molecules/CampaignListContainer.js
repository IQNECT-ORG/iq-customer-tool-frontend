import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CampaignList from 'app/common/components/molecules/CampaignList';
import ui from 'redux-ui/transpiled';
import campaignActions from 'app/common/actions/campaigns';
import { getCampaigns } from 'app/core/selectors/entities/campaigns';
import { getTriggers } from 'app/core/selectors/entities/triggers';
import { getBrands } from 'app/core/selectors/entities/brands';
import _ from 'lodash';
import { analyticsFiltersUpdate } from '../../signals';

// @TODO: This and the catalogue version
// need to be refactored into one peice.
const mapStateToProps = (state, ownProps) => {
  let filteredCampaigns = _.filter(getCampaigns(state), campaign => {
    if(ownProps.ui.filter == null) {
      return true;
    }
    return _.includes(_.lowerCase(campaign.name), _.lowerCase(ownProps.ui.filter));
  });

  let triggers = getTriggers(state);
  const brands = getBrands(state);

  let campaigns = _.map(filteredCampaigns, campaign => {
    const trigger = _.find(triggers, x => x.campaignId === campaign.campaignId);
    const brand = _.find(brands, x => x.brandId === campaign.defaultBrand);

    return _.assign({}, campaign, {
      thumbnail: _.get(trigger, 'imgPreview'),
      state: _.get(trigger, 'state'),
      brand
    });
  });

  return {
    campaigns
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      analyticsFiltersUpdate
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const view = (campaign) => {
    dispatchProps.actions.analyticsFiltersUpdate({
      campaignId: campaign.campaignId
    });
  };

  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onFilterSubmit: (values) => {
      ownProps.updateUI('filter', values.filter);
    },
    onDeleteClick: (campaign) => {
      //dispatch(deleteCampaign(campaign.campaignId));
    },
    onThumbnailClick: view,
    onViewClick: view
  });
};

let DecoratedComponent = CampaignList;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'campaignList',
  state: {
    filter: null
  }
})(DecoratedComponent);

export default DecoratedComponent;