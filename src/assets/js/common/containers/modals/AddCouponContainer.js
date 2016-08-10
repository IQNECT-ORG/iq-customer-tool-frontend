import { bindActionCreators } from 'redux';
import { modalOpen } from 'app/modal/signals';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddCoupon from '../../components/modals/AddCoupon';
import { ModalPaths } from '../../Constants';

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      modalOpen
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onBrowseClick(e) {
      dispatchProps.actions.modalOpen({
        path: ModalPaths.COUPON_BROWSER,
        data: ownProps.data
      });
    },

    onSubmit(e) {
      e.preventDefault();

      dispatchProps.actions.modalOpen({
        path: ModalPaths.COUPON_CREATE,
        data: ownProps.data
      });
    }
  });
};

let DecoractedComponent = AddCoupon;
DecoractedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoractedComponent);
export default DecoractedComponent;