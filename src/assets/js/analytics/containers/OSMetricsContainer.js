import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import Metrics from '../components/Metrics';
import colorScheme from '../colorScheme';

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  // Get the total number
  const total = _.size(allSearches);
  const osData = _(allSearches)
    // Need to merge bad values down to unknown
    .thru(value => _.transform(value, (result, search) => {
      const deviceType = search.deviceType;

      if(deviceType == null || deviceType === 'deviceType' || deviceType === 'null') {
        search.deviceType = 'Unknown'
      }

      result.push(search);
    }, []))
    // Count each type
    .thru(value => _.countBy(value, search => search.deviceType))
    // Make them percentages
    .thru(value => _.transform(value, (result, value, key) => {
      result[key] = ((value / total) * 100).toFixed(0);
    }, {}))
    // Converting the data to the chart format
    .thru(value => _.reduce(value, (result, value, key) => {
      result.push({
        label: key,
        value: `${value}%`
      });
      return result;
    }, []))
    .value();

  return {
    metrics: osData,
    colorScheme
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = Metrics;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;