import React, { Component } from 'react';
import _ from 'lodash';

const DrawNavController = Component => class extends Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object,
    };
  }

  componentWillMount() {
    this._checkAuth();
  }

  render() {
    return <Component {...this.props}/>;
  }

  _checkAuth() {
    if(this.props.auth.get('token')) {

    } else {
      //this.context.router.push('/signin');
    }
  }
};

export default DrawNavController;