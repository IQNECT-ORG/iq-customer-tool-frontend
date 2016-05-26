import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import fp from 'lodash/fp';
import moment from 'moment';
import HeadedMetrics from '../components/HeadedMetrics';
import colorScheme from '../colorScheme';

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  const countAllSearches = _.size(allSearches);

  const countUniqueScans = fp.flow(
    fp.transform(
      (result, search) => {
        result.push(search.deviceId);
      },
      []
    ),
    fp.uniq,
    fp.size
  )(allSearches);

  let averageScan;
  if(countUniqueScans === 0) {
    averageScan = 0;
  } else {
    averageScan = (countAllSearches / countUniqueScans).toFixed(2);
  }

  const metrics = [
    {
      label: 'Number of Scans',
      value: countAllSearches
    },
    {
      label: 'Unique Scans',
      value: countUniqueScans
    },
    {
      label: 'Average Scan per User',
      value: averageScan
    }
  ];

  return {
    metrics,
    colorScheme
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = HeadedMetrics;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;