import React, { Component } from 'react';
import _ from 'lodash';

class ModalManager extends Component {
  static get contextTypes() {
    return {
    };
  }

  render() {
    const components = _(this.props.paths)
      .map((component, path) => {
        return React.createElement(component, {
          key: path,
          isOpen: path === this.props.path
        });
      })
      .values()
      .value();

    return (
      <div>
        {components}
      </div>
    );
  }
};

export default ModalManager;