import React, { Component } from 'react';
import { connect } from 'react-redux';
import DrawNav from 'app/common/containers/DrawNavContainer';
import SystemAlertMessagesContainer from 'app/common/containers/SystemAlertMessagesContainer';
import AuthRequired from 'app/auth/components/hoc/AuthRequired';
import Titlebar from 'app/common/components/layout/Titlebar';
import ui from 'redux-ui/transpiled';
import { loadCampaignPrintCreate } from '../actions';

import CreateCampaignContainer from '../containers/CreateCampaignContainer';
import BrandSelectorContainer from '../containers/BrandSelectorContainer';

class CreateCampaign extends Component {

  componentDidMount() {
    this.props.actions.load();
  }

  componentWillUpdate(nextProps) {
    //nextProps.actions.load();
  }

  render() {
    return (
      <div>
        <DrawNav/>

        <main className="page-content" role="main">
          <div className="container-fluid">
            <SystemAlertMessagesContainer/>
          </div>

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

          <div className="container">
            {this._renderContent()}
          </div>
        </main>
      </div>
    );
  }

  _renderContent() {
    if(this.props.selectedBrandId == null) {
      return (
        <BrandSelectorContainer/>
      );
    }

    return (
      <CreateCampaignContainer/>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    selectedBrandId: state.campaignPrint.getIn(['create', 'selectedBrandId'])
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      load: () => {
        dispatch(loadCampaignPrintCreate())
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