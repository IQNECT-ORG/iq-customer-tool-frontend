import LoginForm from '../../components/organisms/LoginForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { authLogin } from '../../signals';

const mapStateToProps = undefined;

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      authLogin
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onSubmit: (values) => {
      return new Promise((resolve, reject) => {
        dispatchProps.actions.authLogin({
          values,
          form: 'loginForm',
          resolve,
          reject
        });
      });
    }
  });
};

const fields = ['email', 'password'];

let DecoratedComponent = LoginForm;
DecoratedComponent = reduxForm(
  {
    form: 'loginForm',
    fields
  },
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;