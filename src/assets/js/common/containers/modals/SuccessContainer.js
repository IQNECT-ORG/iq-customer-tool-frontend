import { bindActionCreators } from 'redux';
import { modalClose } from 'app/modal/signals';
import { push } from 'react-router-redux/lib/actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import Success from '../../components/modals/Success';

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      modalClose,
      push
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onLeaveClick: _ => {
      dispatchProps.actions.modalClose();
      dispatchProps.actions.push('/');
    }
  });
};

let DecoractedComponent = Success;
DecoractedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoractedComponent);
export default DecoractedComponent;