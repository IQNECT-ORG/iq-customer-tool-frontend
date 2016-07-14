import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Steptracker from 'app/common/components/Steptracker';
import { getUI } from 'app/core/selectors/ui';

const mapStateToProps = (state, ownProps) => {
  const step = _.get(getUI(state), 'scene.campaignPrint.step');

  return {
    steps: [
      {
        label: 'Step 1',
        isActive: step === 0,
        isPast: step > 0
      },
      {
        label: 'Step 2',
        isActive: step === 1,
        isPast: step > 1
      },
      {
        label: 'Step 3',
        isActive: step === 2,
        isPast: step > 2
      }
    ]
  };
}

const mapDispatchToProps = undefined;
const mergeProps = undefined;

let DecoratedComponent = Steptracker;
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;