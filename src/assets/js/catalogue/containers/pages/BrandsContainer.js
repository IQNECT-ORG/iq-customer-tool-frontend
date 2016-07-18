import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ui from 'redux-ui/transpiled';
import AuthenticationRequiredContainer from 'app/common/containers/hoc/AuthenticationRequiredContainer';
import { catalogueLoadBrandPage } from '../../signals';
import { modalOpen } from 'app/modal/signals';
import BrandsPage from '../../components/pages/Brands';

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
    })
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onAddBrandClick: () => {
      dispatchProps.actions.modalOpen({
        
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