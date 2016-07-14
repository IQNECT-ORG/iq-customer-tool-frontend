import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ui from 'redux-ui/transpiled';
import { catalogueLoadCouponsPage } from '../../signals';
import { modalOpen } from 'app/modal/signals';
import AuthenticationRequiredContainer from 'app/common/containers/AuthenticationRequiredContainer';
import CouponsPage from '../../components/pages/Coupons';
import _ from 'lodash';

class CouponsContainer extends Component {
  componentDidMount() {
    this.props.actions.load();
  }

  render() {
    return (
      <CouponsPage {...this.props}/>
    );
  }
}

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      load: catalogueLoadCouponsPage,
      modalOpen
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onAddCouponClick: () => {
      dispatchProps.actions.modalOpen({
        
      });
    }
  });
};

let DecoratedComponent = CouponsContainer;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
// DecoratedComponent = ui({
// })(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;