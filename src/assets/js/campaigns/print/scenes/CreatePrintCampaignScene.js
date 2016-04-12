import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import AuthRequired from 'app/auth/components/hoc/AuthRequired';
import Titlebar from 'app/common/components/layout/Titlebar';
import ui from 'redux-ui/transpiled';
import { loadCampaignPrintCreate } from '../actions';

import CreateCampaignContainer from '../containers/CreateCampaignContainer';

class CreatePrintCampaign extends Component {

  componentDidMount() {
    this.props.actions.load();
  }

  componentWillUpdate(nextProps) {
    //nextProps.actions.load();
  }

  render() {
    return (
      <DefaultLayout>
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
          <CreateCampaignContainer/>
        </div>
      </DefaultLayout>
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

let DecoratedComponent = CreatePrintCampaign;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = AuthRequired(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);

export default DecoratedComponent;