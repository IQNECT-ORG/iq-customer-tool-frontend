import React, { Component } from 'react';
import _ from 'lodash';

class Steptracker extends Component {
  render() {
    return (
      <ul className="list-unstyled steptracker">
        {this._renderSteps()}
      </ul>
    );
  }

  _renderSteps() {
    return _.map(this.props.steps, this._renderStep, this);
  }

  _renderStep(step, index, steps) {
    const isFirst = index === 0;
    const isLast = index === steps.length - 1;
    const isOnly = steps.length === 1;

    var separator = null;

    if(isLast === false) {
      separator = (
        <div className="steptracker__separator">
          Arrow ->
        </div>
      );
    }

    return (
      <li key={index} className="steptracker__item">
        <div className="steptracker__step">
          {step.label}
        </div>
        {separator}
      </li>
    );
  }
};

export default Steptracker;