import ResetPasswordForm from '../../components/organisms/ResetPasswordForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { authResetPassword } from '../../signals';

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      authResetPassword
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onSubmit: (values) => {
      return new Promise((resolve, reject) => {
        dispatchProps.actions.authResetPassword({
          code: values.token,
          password: values.password,
          rePassword: values.passwordMatch
        });
      });
    }
  });
};

const fields = ['token', 'password', 'passwordMatch'];

let DecoratedComponent = ResetPasswordForm;
DecoratedComponent = reduxForm(
  {
    form: 'resetPassword',
    fields
  },
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;