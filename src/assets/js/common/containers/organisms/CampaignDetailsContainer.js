import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CampaignDetails from 'app/common/components/organisms/CampaignDetails';
import { getCampaigns } from 'app/core/selectors/entities/campaigns';
import _ from 'lodash';
import campaignActions from '../../actions/campaigns';
import { createSelector } from 'reselect';

const getCampaignId = (state, props) => {
  return props.campaignId;
};

const makeGetCampaign = () => {
  return createSelector(
    getCampaigns, getCampaignId,
    (campaigns, campaignId) => {
      return campaigns[campaignId];
    }
  );
};

const makeMapStateToProps = () => {
  const getCampaign = makeGetCampaign();

  const mapStateToProps = (state, ownProps) => {
    return {
      campaign: getCampaign(state, ownProps)
    };
  };

  return mapStateToProps;
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      loadCampaign: campaignActions.fetch
    }, dispatch)
  };
};


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
  });
};

class CampaignDetailsContainer extends Component {

  componentWillMount() {
    this.props.actions.loadCampaign({
      id: this.props.campaignId
    });
  }

  render() {
    return (
      <CampaignDetails {...this.props}/>
    );
  }
}

let DecoratedComponent = CampaignDetailsContainer;
DecoratedComponent = connect(
  makeMapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;