import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import CouponBrowser from 'app/common/components/couponBrowser/CouponBrowser';
import { getCoupons } from 'app/core/selectors/entities/coupons';
import { campaignSelectCoupon } from '../../signals';
import _ from 'lodash';

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
      campaignSelectCoupon
    }, dispatch)
  };
};


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onCouponClick: (e, coupon) => {
      dispatchProps.actions.campaignSelectCoupon({
        couponId: coupon.couponId,
        form: ownProps.form,
        field: ownProps.field
      });
    },
    onFilterSubmit: (values) => {
      ownProps.updateUI('filter', values.filter);
    }
  });
};

let DecoratedComponent = CouponBrowser;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'couponList',
  state: {
    filter: null
  }
})(DecoratedComponent);

export default DecoratedComponent;