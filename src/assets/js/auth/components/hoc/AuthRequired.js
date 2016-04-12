import React, { Component } from 'react';
import _ from 'lodash';

const DrawNavController = DecoratedComponent => class extends Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object,
      store: React.PropTypes.object
    };
  }

  componentWillMount() {
    this._checkAuth();
  }

  render() {
    return <DecoratedComponent {...this.props}/>;
  }

  _checkAuth() {
    //if(this.props.auth.get('token')) {

    //} else {
      //this.context.router.push('/signin');
    //}
  }
};

export default DrawNavController;