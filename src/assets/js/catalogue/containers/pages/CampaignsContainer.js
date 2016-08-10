import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import { catalogueLoadCampaignPage } from '../../signals';
import AuthenticationRequiredContainer from 'app/common/containers/hoc/AuthenticationRequiredContainer';
import CampaignsPage from '../../components/pages/Campaigns';

class CampaignsContainer extends Component {

  componentDidMount() {
    this.props.actions.load();
  }

  render() {
    return (
      <CampaignsPage {...this.props}/>
    );
  }

};

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      load: catalogueLoadCampaignPage
    })
  };
};

let DecoratedComponent = CampaignsContainer;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecoratedComponent);
// DecoratedComponent = ui({
// })(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;