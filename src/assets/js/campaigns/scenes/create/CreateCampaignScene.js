import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import AuthRequired from 'app/auth/components/hoc/AuthRequired';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/Titlebar';
import BrandSelectorContainer from '../../containers/BrandSelectorContainer';
import { loadCampaignCreate, selectBrand } from '../../actions';

import CampaignTypeSelectorContainer from '../../containers/CampaignTypeSelectorContainer';

class CreateCampaign extends Component {
  componentDidMount() {
    this.props.actions.selectBrand(this.props.routeParams.brandId);
    this.props.actions.load();
  }

  componentWillUpdate(nextProps) {
    //nextProps.actions.load();
  }

  render() {
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

};

const mapStateToProps = (state, ownProps) => {
  return {
    selectedBrandId: state.campaigns.getIn(['create', 'selectedBrandId'])
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