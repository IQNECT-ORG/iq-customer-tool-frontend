import ModalManager from '../components/ModalManager';
import _ from 'lodash';
import { connect } from 'react-redux';
import { modalClose, modalJump } from '../signals';
import { bindActionCreators } from 'redux';
import { getModalPresent } from '../selectors';

const mapStateToProps = (state) => {
  const modalState = getModalPresent(state);

  return {
    path: modalState.path,
    isOpen: modalState.isOpen,
    data: modalState.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      modalClose,
      modalJump
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onCloseClick: () => dispatchProps.actions.modalClose(),
    onRestoreClick: () => dispatchProps.actions.modalJump(-2)
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ModalManager);