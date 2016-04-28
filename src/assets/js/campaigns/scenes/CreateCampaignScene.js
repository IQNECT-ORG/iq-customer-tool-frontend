import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import { updateUI } from 'redux-ui/transpiled/action-reducer';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import { loadCampaignCreatePage, selectBrand, selectCampaignType, resetCampaignCreate } from '../actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';
import Constants from 'app/common/Constants';

import BrandSelectorContainer from '../containers/BrandSelectorContainer';
import CampaignTypeSelectorContainer from '../containers/CampaignTypeSelectorContainer';
import PrintCampaignFormContainer from '../containers/print/CampaignFormContainer';
import ImageCampaignFormContainer from '../containers/image/CampaignFormContainer';

import Steptracker from 'app/common/components/Steptracker';
import Avatar from 'app/common/components/Avatar';

class CreateCampaign extends Component {
  componentDidMount() {
    if(this.props.params.brandId) {
      this.props.actions.selectBrand(this.props.params.brandId);
    }

    if(this.props.params.campaignTypeId) {
      this.props.actions.selectCampaignType(this.props.params.campaignTypeId);
    }

    if(this.props.params.brandId == null && this.props.params.campaignTypeId == null) {
      this.props.actions.reset();
    }

    this.props.actions.load();
    this.props.actions.closeMenu();
  }

  componentWillUpdate(nextProps) {
    if(nextProps.params.brandId && nextProps.params.brandId !== this.props.params.brandId) {
      nextProps.actions.selectBrand(nextProps.params.brandId);
    }

    if(nextProps.params.campaignTypeId && nextProps.params.campaignTypeId !== this.props.params.campaignTypeId) {
      nextProps.actions.selectCampaignType(nextProps.params.campaignTypeId);
    }

    if(nextProps.params.brandId == null && nextProps.params.campaignTypeId == null) {
      if(this.props.selectedBrandId || this.props.selectedCampaignTypeId) {
        nextProps.actions.reset();
      }
    }

  }

  render() {
    if(this.props.selectedBrandId == null) {
      return (
        <DefaultLayout
          titleRender={_ => {
            return (
              <Titlebar
                title="Select a Brand"
                ctas={[(
                  <button
                    className="btn btn-secondary btn-radius-lg btn-block"
                    type="button"
                    onClick={this.props.actions.openAddBrandModal}>
                    Add New Brand
                  </button>
                )]}/>
            );
          }}>
          <div className="container container--gutter">
            <BrandSelectorContainer/>
          </div>
        </DefaultLayout>
      );
    }

    if(this.props.selectedCampaignTypeId == null) {
      if(this.props.selectedBrand == null) {
        return (
          <div>Loading...</div>
        );
      }

      return (
        <DefaultLayout
          titleRender={_ => {
            return (
              <Titlebar
                title="Choose a Campaign Type"
                avatars={[
                  { src: this.props.selectedBrand.imgPreview }
                ]}/>
            );
          }}>
          <div className="container container--gutter">
            <CampaignTypeSelectorContainer/>
          </div>
        </DefaultLayout>
      );
    }

    if(this.props.selectedBrand == null) {
      return (
        <div>Loading...</div>
      );
    }

    let form;
    let steptracker;
    switch(this.props.selectedCampaignTypeId >> 0) {
      case Constants.CampaignTypes.IMAGE:
        form = (
          <ImageCampaignFormContainer
            selectedBrandId={this.props.selectedBrandId}
            selectedCampaignTypeId={this.props.selectedCampaignTypeId}/>
        );
        steptracker = null;
        break;
      case Constants.CampaignTypes.PDF:
        form = (
          <PrintCampaignFormContainer
            selectedBrandId={this.props.selectedBrandId}
            selectedCampaignTypeId={this.props.selectedCampaignTypeId}/>
        );
        steptracker = (
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
        break;
    }

    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar
              title="Choose a Campaign Type"
              avatars={[
                { src: this.props.selectedBrand.imgPreview },
                { icon: 'icons8-settings' }
              ]}
              steptracker={steptracker}/>
          );
        }}>
        <div className="container container--gutter">
          {form}
        </div>
      </DefaultLayout>
    );
  }

};

const mapStateToProps = (state, ownProps) => {
  const selectedBrandId = state.campaigns.getIn(['create', 'selectedBrandId']);
  let selectedBrand;
  if(selectedBrandId) {
    selectedBrand = state.entities.getIn(['brands', selectedBrandId]);

    if(selectedBrand) {
      selectedBrand = selectedBrand.toJS();
    }
  }
  return {
    steptrackerStep: state.ui.getIn(['scene', 'campaignPrint', 'step']),
    selectedBrandId,
    selectedBrand,
    selectedCampaignTypeId: state.campaigns.getIn(['create', 'selectedCampaignTypeId'])
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      load: () => {
        dispatch(loadCampaignCreatePage());
      },
      closeMenu: _ => {
        dispatch(updateUI(['scene', 'drawNav'], 'isOpen', false));
      },
      selectBrand: (brandId) => {
        dispatch(selectBrand(brandId));
      },
      selectCampaignType: (campaignTypeId) => {
        dispatch(selectCampaignType(campaignTypeId));
      },
      reset: _ => dispatch(resetCampaignCreate()),

      openAddBrandModal: _ => {
        dispatch(updateModalPath('addBrand'));
        dispatch(updateModalData({
        }));
        dispatch(openModal());
      }
    }
  };
};

let DecoratedComponent = CreateCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'scene',
  state: {
  }
})(DecoratedComponent);

export default DecoratedComponent;