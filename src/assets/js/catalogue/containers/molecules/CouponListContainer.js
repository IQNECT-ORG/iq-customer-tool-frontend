import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CouponList from 'app/common/components/molecules/CouponList';
import ui from 'redux-ui';
import couponActions from 'app/common/actions/coupons';
import { getCoupons } from 'app/core/selectors/entities/coupons';
import _ from 'lodash';

class CouponListContainer extends Component {

  componentDidMount() {
    this.props.actions.fetchCoupons();
  }

  render() {
    return (
      <CouponList {...this.props}/>
    );
  }
}

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
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      fetchCoupons: couponActions.fetch
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onFilterSubmit: (values) => {
      ownProps.updateUI('filter', values.filter);
    },
    onDeleteClick: (coupon) => {
      //dispatch(deletecoupon(coupon.couponId));
    },
    onThumbnailClick: (coupon) => {
      // dispatch(updateModalPath('editCoupon'));
      // dispatch(updateModalData({
      //   couponId: coupon.couponId
      // }));
      // dispatch(openModal());
    }
  });
};

let DecoratedComponent = CouponListContainer;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'couponList',
  state: {
    filter: null
  }
})(DecoratedComponent);

export default DecoratedComponent;