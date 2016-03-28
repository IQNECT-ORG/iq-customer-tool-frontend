import React, { Component } from 'react';
import _ from 'lodash';
import { login } from '../../actions/auth';
import serialize from 'form-serialize';

const LoginFormController = Component => class extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object.isRequired,
    };
  }

  constructor(props, context) {
    super(props, context);

    _.bindAll(this, [
      'handleLoginFormSubmit'
    ]);
  }
  render() {
    return <Component onLoginFormSubmit={this.handleLoginFormSubmit} {...this.props}/>;
  }

  handleLoginFormSubmit(e) {
    e.preventDefault();
    const data = serialize(e.currentTarget, { hash: true });
    this.context.store.dispatch(login(data.email, data.password));
  }
};

export default LoginFormController;