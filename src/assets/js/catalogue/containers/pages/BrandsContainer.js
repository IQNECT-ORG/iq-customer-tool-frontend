import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ui from 'redux-ui/transpiled';
import AuthenticationRequiredContainer from 'app/common/containers/hoc/AuthenticationRequiredContainer';
import { catalogueLoadBrandPage } from '../../signals';
import { modalOpen } from 'app/modal/signals';
import BrandsPage from '../../components/pages/Brands';
import { ModalPaths } from 'app/common/Constants';

class BrandsContainer extends Component {

  componentDidMount() {
    this.props.actions.load();
  }

  render() {
    return (
      <BrandsPage {...this.props}/>
    );
  }

};

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      load: catalogueLoadBrandPage,
      modalOpen
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    actions: {
      ...dispatchProps.actions,
      ...ownProps.actions
    },
    onAddBrandClick: () => {
      dispatchProps.actions.modalOpen({
        path: ModalPaths.BRAND_CREATE
      });
    }
  });
};

let DecoratedComponent = BrandsContainer;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
// DecoratedComponent = ui({
// })(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;