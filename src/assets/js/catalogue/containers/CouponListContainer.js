import React, { Component } from 'react';
import { connect } from 'react-redux';
import CouponList from 'app/common/components/couponList/CouponList';
import ui from 'redux-ui/transpiled';
import couponActions from 'app/common/actions/coupons';
import brandActions from 'app/common/actions/brands';
import { getCoupons } from 'app/core/selectors/entities/coupons';
import _ from 'lodash';
import { push } from 'react-router-redux/lib/actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

class CouponListContainer extends Component {

  componentDidMount() {
    this.props.actions.fetchCoupons();
    this.props.actions.fetchBrands();
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
    return _.includes(_.lowerCase(coupon.name), _.lowerCase(ownProps.ui.filter));
  });

  return {
    coupons: filteredCoupons
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      fetchCoupons: () => {
        dispatch(couponActions.fetch());
      },
      fetchBrands: _ => {
        dispatch(brandActions.fetch());
      }
    },
    onFilterSubmit: (values) => {
      ownProps.updateUI('filter', values.filter);
    },
    onDeleteClick: (coupon) => {
      dispatch(deletecoupon(coupon.couponId));
    },
    onThumbnailClick: (coupon) => {
      dispatch(updateModalPath('editCoupon'));
      dispatch(updateModalData({
        couponId: coupon.couponId
      }));
      dispatch(openModal());
    }
  };
}

let DecoratedComponent = CouponListContainer;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'couponList',
  state: {
    filter: null
  }
})(DecoratedComponent);

export default DecoratedComponent;