import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SystemAlertMessages from '../../components/molecules/SystemAlertMessages';
import { getAlertMessages } from 'app/core/selectors/alertMessages';
import _ from 'lodash';
import { alertMessageRead } from '../../signals';

const mapStateToProps = (state) => {
  return {
    messages: getAlertMessages(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      alertMessageRead
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onExpire: (index) => {
      dispatchProps.actions.alertMessageRead(index);
    },
    onDismiss: (index) => {
      dispatchProps.actions.alertMessageRead(index);
    }
  });
};

let DecoratedComponent = SystemAlertMessages;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;