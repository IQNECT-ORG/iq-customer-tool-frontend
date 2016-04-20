import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';

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
        <div className="steptracker__separator pull-xs-left">
          ->
        </div>
      );
    }

    const className = classNames('steptracker__item pull-xs-left', {
      'steptracker__item--active': step.isActive,
      'steptracker__item--past': step.isPast
    });

    return (
      <li key={index} className={className}>
        <div className="steptracker__step pull-xs-left">
          {step.label}
        </div>
        {separator}
      </li>
    );
  }
};

export default Steptracker;