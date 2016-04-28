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
    switch(this.props.campaign.type >> 0) {
      case Constants.CampaignTypes.IMAGE:
        form = (
          <ImageCampaignFormContainer
            campaign={this.props.campaign}
            triggers={this.props.triggers}/>
        );
        break;
      case Constants.CampaignTypes.PDF:
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
                { icon: 'icons8-settings' }
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
  let campaign = state.entities.getIn(['campaigns', ownProps.params.campaignId]);
  let brand;
  if(campaign) {
    brand = state.entities.getIn(['brands', campaign.get('defaultBrand')]);
  }
  let triggers = state.entities.get('triggers').filter(x => x.campaignId === ownProps.campaignId);
  const triggerIds = triggers.reduce((r, x) => {
    return r.push(x.get('triggerId'));
  }, new Immutable.List());

  let trainingResults = state.entities.get('trainingResults').filter(x => {
    return _.includes(triggerIds.toJS(), x.get('triggerId'));
  });

  if(campaign) {
    campaign = campaign.toJS();
  }
  if(brand) {
    brand = brand.toJS();
  }
  if(triggers) {
    triggers = triggers.toJS();
  }

  return {
    campaign,
    brand,
    triggers,
    trainingResults: trainingResults.toJS()
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