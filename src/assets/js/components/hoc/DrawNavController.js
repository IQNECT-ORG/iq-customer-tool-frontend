import React, { Component } from 'react';
import _ from 'lodash';
import { toggleMenu } from '../../actions/drawNav';

const DrawNavController = Component => class extends Component {
  static get contextTypes() {
    return {
      store: React.PropTypes.object,
    };
  }
  
  constructor(props) {
    super(props);

    _.bindAll(this, [
      'handleToggleMenuClick'
    ]);
  }
  render() {
    return <Component onDrawNavToggleMenuClick={this.handleToggleMenuClick} {...this.props}/>;
  }

  handleToggleMenuClick(e) {
    this.context.store.dispatch(toggleMenu());
  }
};

export default DrawNavController;