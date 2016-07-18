import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { dashboardLoadIndexPage } from '../../signals';
import ui from 'redux-ui';
import { getBrands } from 'app/core/selectors/entities/brands';
import AuthenticationRequiredContainer from 'app/common/containers/hoc/AuthenticationRequiredContainer';
import IndexPage from '../../components/pages/Index';

class IndexContainer extends Component {
  componentWillMount() {
    this.props.actions.load();
  }

  render() {
    return (
      <IndexPage {...this.props}/>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const topBrandsIds = state.dashboard.topBrands;

  const topBrands = _.filter(getBrands(state), brand => {
    // Have to cast string to int due to differences in the API.
    return _.includes(topBrandsIds, brand.brandId >> 0);
  });

  return {
    campaignsCount: state.dashboard.campaignsCount,
    triggersCount: state.dashboard.triggersCount,
    matchesCount: state.dashboard.matchesCount,
    topBrands
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      load: dashboardLoadIndexPage
    }, dispatch)
  };
};

const mergeProps = undefined;

let DecoratedComponent = IndexContainer;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
// DecoratedComponent = ui({
// })(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;