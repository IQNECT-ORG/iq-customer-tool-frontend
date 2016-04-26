import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import { updateUI } from 'redux-ui/transpiled/action-reducer';
import Titlebar from 'app/common/components/layout/Titlebar';
import { loadCampaignEditPage, resetCampaignCreate } from '../actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import Constants from 'app/common/Constants';

import CreateCampaignContainer from '../containers/CreateCampaignContainer';
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
    if(this.props.campaign == null || this.props.trigger == null) {
      return (
        <div>Loading...</div>
      );
    }

    let form;
    switch(this.props.selectedCampaignTypeId >> 0) {
      case Constants.CampaignTypes.IMAGE:
        form = (
          <ImageCampaignFormContainer
            campaign={this.props.campaign}
            trigger={this.props.trigger}/>
        );
        break;
      case Constants.CampaignTypes.PDF:
        form = (
          <CreateCampaignContainer
            campaign={this.props.campaign}
            trigger={this.props.trigger}/>
        );
        break;
    }

    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <div className="container-fluid">
              <div className="row">
                <Titlebar className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-12">
                      <Avatar
                        src={' '}/>

                      <Avatar
                        icon={'icons8-settings'}/>

                      <h1>Edit Campaign</h1>
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
                    </div>
                  </div>
                </Titlebar>
              </div>
            </div>
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
  let trigger = state.entities.get('triggers').find(x => x.campaignId === ownProps.campaignId);

  if(campaign) {
    campaign = campaign.toJS();
  }
  if(trigger) {
    trigger = trigger.toJS();
  }

  return {
    campaign,
    trigger
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