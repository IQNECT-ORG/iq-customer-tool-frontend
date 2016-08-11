import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CouponFormContainer from './CouponFormContainer';
import _ from 'lodash';
import { couponEditFormSubmit } from '../../signals';
import { getCoupons } from 'app/core/selectors/entities/coupons';

const mapStateToProps = (state, ownProps) => {
  const coupon = getCoupons(state)[ownProps.couponId];

  return {
    initialValues: {
      //artwork: coupon.source,
      couponName: coupon.title,
      //discountCode: coupon.,

    }
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      couponEditFormSubmit
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onSubmit: values => {
      return new Promise((resolve, reject) => {
        dispatchProps.actions.couponEditFormSubmit({
          values,
          reject,
          resolve,
          isModal: true
        });
      });
    }
  });
};

let DecoratedComponent = CouponFormContainer;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;