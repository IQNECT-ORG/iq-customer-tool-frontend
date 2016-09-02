import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CampaignList from 'app/common/components/molecules/CampaignList';
import ui from 'redux-ui';
import campaignActions from 'app/common/actions/campaigns';
import { getCampaignsOrderedByNewest } from 'app/core/selectors/entities/campaigns';
import { getTriggers } from 'app/core/selectors/entities/triggers';
import { getBrands } from 'app/core/selectors/entities/brands';
import _ from 'lodash';
import { push } from 'react-router-redux/lib/actions';
import fp from 'lodash/fp';
import { deleteEntity } from 'app/common/signals';
import { EntitieNames } from 'app/common/Constants';

class CampaignListContainer extends Component {

  componentWillMount() {
    this.props.updateUI(this.props.location.query);
  }

  render() {
    return (
      <CampaignList {...this.props}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const filteredCampaigns = fp.flow(
    fp.filter(campaign => {
      // By name filter
      if(ownProps.ui.filter == null) {
        return true;
      }
      return _.includes(_.lowerCase(campaign.name), _.lowerCase(ownProps.ui.filter));
    }),
    fp.filter(campaign => {
      // By Brand Id
      if(ownProps.ui.brandId == null) {
        return true;
      }

      return campaign.defaultBrand === ownProps.ui.brandId;
    })
  )(getCampaignsOrderedByNewest(state));

  const triggers = getTriggers(state);
  const brands = getBrands(state);

  const campaigns = _.map(filteredCampaigns, campaign => {
    const trigger = _.find(triggers, x => x.campaignId === campaign.campaignId);
    const brand = _.find(brands, x => x.brandId === campaign.defaultBrand);

    if(trigger == null) {
      return campaign;
    }

    return _.assign({}, campaign, {
      thumbnail: trigger.imgPreview,
      state: trigger.state,
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
      //deleteCampaign: campaignActions.delete,
      deleteEntity,
      push
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const editCTA = (campaign) => {
    dispatchProps.actions.push(`/campaigns/edit/${campaign.campaignId}`);
  };


  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onFilterSubmit: (values) => {
      ownProps.updateUI('filter', values.filter);
    },
    onDeleteClick: (campaign) => {
      dispatchProps.actions.deleteEntity({
        id: campaign.campaignId,
        entity: EntitieNames.CAMPAIGN
      });
    },
    onThumbnailClick: editCTA,
    onViewClick: (campaign) => {
      dispatchProps.actions.push(`/manage/campaigns/${campaign.campaignId}`);
    },
    onEditClick: editCTA,
    onAnalyticsClick: (campaign) => {
      dispatchProps.actions.push({
        pathname: '/analytics',
        query: {
          campaignId: campaign.campaignId
        }
      });
    }
  });
};

let DecoratedComponent = CampaignListContainer;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'campaignList',
  state: {
    filter: null,
    brandId: null
  }
})(DecoratedComponent);

export default DecoratedComponent;