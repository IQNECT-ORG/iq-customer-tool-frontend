import ForgottenPasswordForm from '../../components/organisms/ForgottenPasswordForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { authForgottenPassword } from '../../signals';

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      authForgottenPassword
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onSubmit: (values) => {
      dispatchProps.actions.authForgottenPassword({
        email: values.email
      });
    }
  });
};

const fields = ['email'];

let DecoratedComponent = ForgottenPasswordForm;
DecoratedComponent = reduxForm(
  {
    form: 'forgottenPassword',
    fields
  },
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;