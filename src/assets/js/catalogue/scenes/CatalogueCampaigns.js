import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import { } from '../actions';
import CampaignListContainer from '../containers/CampaignListContainer';
import AuthenticationRequiredContainer from 'app/common/containers/AuthenticationRequiredContainer';

class CatalogueCampaigns extends Component {

  render() {
    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar title="Manage / Campaigns"/>
          );
        }}>
        <div className="container container--gutter">
          <CampaignListContainer/>
        </div>
      </DefaultLayout>
    );
  }

};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
    }
  };
};

let DecoratedComponent = CatalogueCampaigns;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;