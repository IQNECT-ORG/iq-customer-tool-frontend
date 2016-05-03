import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import { updateUI } from 'redux-ui/transpiled/action-reducer';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import { loadCampaignEditPage, resetCampaignCreate } from '../actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import Constants from 'app/common/Constants';
import _ from 'lodash';

import PrintCampaignFormContainer from '../containers/print/CampaignFormContainer';
import ImageCampaignFormContainer from '../containers/image/CampaignFormContainer';

import Steptracker from 'app/common/components/Steptracker';
import Avatar from 'app/common/components/Avatar';

import { getUI } from 'app/core/selectors/ui';

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

    let form;
    let icon;
    switch(this.props.campaign.type >> 0) {
      case Constants.CampaignTypes.IMAGE:
        icon = 'icons8-picture';
        form = (
          <ImageCampaignFormContainer
            campaign={this.props.campaign}
            triggers={this.props.triggers}/>
        );
        break;
      case Constants.CampaignTypes.PDF:
        icon = 'icons8-magazine';
        form = (
          <PrintCampaignFormContainer
            campaign={this.props.campaign}
            triggers={this.props.triggers}
            trainingResults={this.props.trainingResults}/>
        );
        break;
    }

    const steptracker = (
      <Steptracker
        steps={[
          {
            label: 'Step 1',
            isActive: this.props.steptrackerStep === 0,
            isPast: this.props.steptrackerStep > 0
          },
          {
            label: 'Step 2',
            isActive: this.props.steptrackerStep === 1,
            isPast: this.props.steptrackerStep > 1
          },
          {
            label: 'Step 3',
            isActive: this.props.steptrackerStep === 2,
            isPast: this.props.steptrackerStep > 2
          }
        ]}/>
    );

    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar
              title="Choose a Campaign Type"
              avatars={[
                { src: this.props.brand.imgPreview },
                { icon: icon }
              ]}
              steptracker={steptracker}/>
          );
        }}>
        <div className="container">
          {form}
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
  let triggers = _.filter(state.entities.triggers, x => x.campaignId === ownProps.campaignId);
  const triggerIds = _.reduce(triggers, (r, x) => {
    return r.push(x.triggerId);
  }, []);

  let trainingResults = _.filter(state.entities.trainingResults, x => {
    return _.includes(triggerIds, x.triggerId);
  });

  return {
    steptrackerStep: _.get(getUI(state), 'scene.campaignPrint.step'),
    campaign,
    brand,
    triggers,
    trainingResults: trainingResults
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

export default DecoratedComponent;