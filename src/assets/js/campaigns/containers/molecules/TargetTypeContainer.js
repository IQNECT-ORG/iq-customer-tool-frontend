import { connect } from 'react-redux';
import TargetType from '../../components/molecules/TargetType';
import { getCoupons } from 'app/core/selectors/entities/coupons';

const mapStateToProps = (state, ownProps) => {
  return {
    coupon: getCoupons(state)[ownProps.values.couponId]
  };
}

const mapDispatchToProps = undefined;
const mergeProps = undefined;

let DecoratedComponent = TargetType;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;