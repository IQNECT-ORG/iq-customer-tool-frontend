import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import { updateUI } from 'redux-ui/transpiled/action-reducer';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import CampaignTitlebar from '../components/CampaignTitlebar';
import { loadCampaignEditPage, resetCampaignCreate } from '../actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import Constants from 'app/common/Constants';
import _ from 'lodash';

import Avatar from 'app/common/components/Avatar';
import SteptrackerContainer from '../containers/SteptrackerContainer';
import Campaign from '../components/Campaign';

import { getUI } from 'app/core/selectors/ui';
import AuthenticationRequiredContainer from 'app/common/containers/AuthenticationRequiredContainer';

class EditCampaign extends Component {
  componentDidMount() {
    this.props.actions.load({
      campaignId: this.props.params.campaignId
    });
    this.props.actions.closeMenu();
  }

  componentWillUpdate(nextProps) {
  }

  render() {
    if(
      this.props.campaign == null ||
      this.props.brand == null ||
      _.size(this.props.triggers) === 0
    ) {
      return (
        <div>Loading...</div>
      );
    }

    if(
      this.props.campaign.type >> 0 === Constants.CampaignTypes.PDF &&
      _.size(this.props.trainingResults) === 0
    ) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <CampaignTitlebar
              flow="create"
              campaignType={this.props.campaign.type >> 0}
              brand={this.props.brand}/>
          );
        }}>
        <div className="container">
          <Campaign
            campaignType={this.props.campaign.type >> 0}
            campaign={this.props.campaign}
            triggers={this.props.triggers}
            trainingResults={this.props.trainingResults}
            triggerPayloads={this.props.triggerPayloads}/>
        </div>
      </DefaultLayout>
    );
  }

};

const mapStateToProps = (state, ownProps) => {
  let campaign = state.entities.campaigns[ownProps.params.campaignId];
  let brand;
  if(campaign) {
    brand = state.entities.brands[campaign.defaultBrand];
  }

  let triggers = _.filter(state.entities.triggers, x => x.campaignId === ownProps.params.campaignId);

  const triggerIds = _.reduce(triggers, (r, x) => {
    r.push(x.triggerId);
    return r;
  }, []);

  let trainingResults = _.filter(state.entities.trainingResults, x => {
    return _.includes(triggerIds, x.triggerId);
  });


  let triggerPayloads = _.filter(state.entities.triggerPayloads, triggerPayloads, x => {
    return _.includes(triggerIds, x.triggerId);
  });

  return {
    steptrackerStep: _.get(getUI(state), 'scene.campaignPrint.step'),
    campaign,
    brand,
    triggers,
    trainingResults,
    triggerPayloads
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      load: payload => {
        dispatch(loadCampaignEditPage(payload));
      },
      closeMenu: _ => {
        dispatch(updateUI(['scene', 'drawNav'], 'isOpen', false));
      },
      openAddBrandModal: _ => {
        dispatch(updateModalPath('addBrand'));
        dispatch(updateModalData({
        }));
        dispatch(openModal());
      }
    }
  };
};

let DecoratedComponent = EditCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'scene',
  state: {
  }
})(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;