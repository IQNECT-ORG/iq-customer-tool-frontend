import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import AuthRequired from 'app/auth/components/hoc/AuthRequired';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/Titlebar';
import { loadCampaignCreate, selectBrand, selectCampaignType } from '../../actions';

import BrandSelectorContainer from '../../containers/BrandSelectorContainer';
import CampaignTypeSelectorContainer from '../../containers/CampaignTypeSelectorContainer';
import CreateCampaignContainer from '../../containers/CreateCampaignContainer';

class CreateCampaign extends Component {
  componentDidMount() {
    this.props.actions.selectBrand(this.props.routeParams.brandId);
    this.props.actions.selectCampaignType(this.props.routeParams.campaignTypeId);
    this.props.actions.load();
  }

  componentWillUpdate(nextProps) {
    //nextProps.actions.load();
  }

  render() {
    console.log(this.props.selectedBrandId, this.props.selectedCampaignTypeId);
    if(this.props.selectedBrandId == null) {
      return (
        <DefaultLayout
          titleRender={_ => {
            return (
              <div className="container-fluid">
                <div className="row">
                  <Titlebar className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-12">
                        <h1>Select a Brand</h1>
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
          <CreateCampaignContainer/>
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
      }
    }
  };
};

let DecoratedComponent = CreateCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = AuthRequired(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);

export default DecoratedComponent;