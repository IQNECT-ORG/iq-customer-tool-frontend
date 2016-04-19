import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/Titlebar';
import { loadCampaignCreate, selectBrand, selectCampaignType, resetCampaignCreate } from '../../actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

import BrandSelectorContainer from '../../containers/BrandSelectorContainer';
import CampaignTypeSelectorContainer from '../../containers/CampaignTypeSelectorContainer';
import CreateCampaignContainer from '../../containers/CreateCampaignContainer';

class CreateCampaign extends Component {
  componentDidMount() {
    if(this.props.routeParams.brandId) {
      this.props.actions.selectBrand(this.props.routeParams.brandId);
    }

    if(this.props.routeParams.campaignTypeId) {
      this.props.actions.selectCampaignType(this.props.routeParams.campaignTypeId);
    }

    if(this.props.routeParams.brandId == null && this.props.routeParams.campaignTypeId == null) {
      this.props.actions.reset();
    }

    this.props.actions.load();
  }

  componentWillUpdate(nextProps) {
    if(nextProps.routeParams.brandId && nextProps.routeParams.brandId !== this.props.routeParams.brandId) {
      nextProps.actions.selectBrand(nextProps.routeParams.brandId);
    }

    if(nextProps.routeParams.campaignTypeId && nextProps.routeParams.campaignTypeId !== this.props.routeParams.campaignTypeId) {
      nextProps.actions.selectCampaignType(nextProps.routeParams.campaignTypeId);
    }

    if(nextProps.routeParams.brandId == null && nextProps.routeParams.campaignTypeId == null) {
      if(this.props.selectedBrandId || this.props.selectedCampaignTypeId) {
        nextProps.actions.reset();
      }
    }

  }

  render() {
    if(this.props.selectedBrandId == null) {
      return (
        <DefaultLayout
          drawNavProps={{
            isOpen: false
          }}
          titleRender={_ => {
            return (
              <div className="container-fluid">
                <div className="row">
                  <Titlebar className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-6">
                        <h1>Select a Brand</h1>
                      </div>
                      <div className="col-xs-6">
                        <button
                          className="btn btn-secondary"
                          type="button"
                          onClick={this.props.actions.openAddBrandModal}>
                          Add New Brand
                        </button>
                      </div>
                    </div>
                  </Titlebar>
                </div>
              </div>
            );
          }}>
          <div className="container">
            <BrandSelectorContainer/>
          </div>
        </DefaultLayout>
      );
    }

    if(this.props.selectedCampaignTypeId == null) {
      return (
        <DefaultLayout
          drawNavProps={{
            isOpen: false
          }}
          titleRender={_ => {
            return (
              <div className="container-fluid">
                <div className="row">
                  <Titlebar className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-12">
                        <h1>Choose a Campaign Type</h1>
                      </div>
                    </div>
                  </Titlebar>
                </div>
              </div>
            );
          }}>
          <div className="container">
            <CampaignTypeSelectorContainer/>
          </div>
        </DefaultLayout>
      );
    }

    return (
      <DefaultLayout
        drawNavProps={{
            isOpen: false
          }}
        titleRender={_ => {
          return (
            <div className="container-fluid">
              <div className="row">
                <Titlebar className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-12">
                      <h1>Create Campaign</h1>
                    </div>
                  </div>
                </Titlebar>
              </div>
            </div>
          );
        }}>
        <div className="container">
          <CreateCampaignContainer
            selectedBrandId={this.props.selectedBrandId}
            selectedCampaignTypeId={this.props.selectedCampaignTypeId}/>
        </div>
      </DefaultLayout>
    );
  }

};

const mapStateToProps = (state, ownProps) => {
  return {
    selectedBrandId: state.campaigns.getIn(['create', 'selectedBrandId']),
    selectedCampaignTypeId: state.campaigns.getIn(['create', 'selectedCampaignTypeId'])
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      load: () => {
        dispatch(loadCampaignCreate());
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
})(DecoratedComponent);

export default DecoratedComponent;