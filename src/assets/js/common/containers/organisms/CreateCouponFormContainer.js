import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CouponFormContainer from './CouponFormContainer';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  const coupon = ownProps.coupon;

  return {
    initialValues: {
      couponName: _.get(coupon, 'title')
    }
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onSubmit: values => {

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