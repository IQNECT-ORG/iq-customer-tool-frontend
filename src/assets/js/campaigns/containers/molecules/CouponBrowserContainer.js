import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import CouponBrowser from 'app/common/components/couponBrowser/CouponBrowser';
import { getCoupons } from 'app/core/selectors/entities/coupons';
import { selectCoupon } from '../actions';

const mapStateToProps = (state, ownProps) => {
  let filteredCoupons = _.filter(getCoupons(state), coupon => {
    if(ownProps.ui.filter == null) {
      return true;
    }
    return _.includes(_.lowerCase(coupon.title), _.lowerCase(ownProps.ui.filter));
  });

  return {
    coupons: filteredCoupons
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCouponClick: (e, coupon) => {
      dispatch(selectCoupon({
        couponId: coupon.couponId,
        form: ownProps.form,
        field: ownProps.field
      }));
    },
    onFilterSubmit: (values) => {
      ownProps.updateUI('filter', values.filter);
    }
  };
}

let DecoratedComponent = CouponBrowser;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'couponList',
  state: {
    filter: null
  }
})(DecoratedComponent);

export default DecoratedComponent;