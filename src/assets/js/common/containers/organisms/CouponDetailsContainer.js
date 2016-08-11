import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CouponDetails from 'app/common/components/organisms/CouponDetails';
import { getCoupons } from 'app/core/selectors/entities/coupons';
import _ from 'lodash';
import couponActions from '../../actions/coupons';
import { createSelector } from 'reselect';

const getCouponId = (state, props) => {
  return props.couponId;
};

const makeGetCoupon = () => {
  return createSelector(
    getCoupons, getCouponId,
    (coupons, couponId) => {
      return coupons[couponId];
    }
  );
};

const makeMapStateToProps = () => {
  const getCoupon = makeGetCoupon();

  const mapStateToProps = (state, ownProps) => {
    return {
      coupon: getCoupon(state, ownProps)
    };
  };

  return mapStateToProps;
};


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      loadCoupon: couponActions.fetch
    }, dispatch)
  };
};


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
  });
};

class CouponDetailsContainer extends Component {

  componentWillMount() {
    this.props.actions.loadCoupon({
      id: this.props.couponId
    });
  }

  render() {
    return (
      <CouponDetails {...this.props}/>
    );
  }
}

let DecoratedComponent = CouponDetailsContainer;
DecoratedComponent = connect(
  makeMapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;