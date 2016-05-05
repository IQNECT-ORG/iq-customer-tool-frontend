import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import TargetType from '../components/TargetType';
import { getCoupons } from 'app/core/selectors/entities/coupons';

const mapStateToProps = (state, ownProps) => {
  return {
    coupon: getCoupons(state)[ownProps.values.couponId]
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
}

let DecoratedComponent = TargetType;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;