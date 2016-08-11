import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CouponFormContainer from './CouponFormContainer';
import _ from 'lodash';
import { couponCreateFormSubmit } from '../../signals';

const mapStateToProps = void 0;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      couponCreateFormSubmit
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onSubmit: values => {
      return new Promise((resolve, reject) => {
        dispatchProps.actions.couponCreateFormSubmit({
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