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
  const genderData = _(allSearches)
    // Count each gender type
    .thru(value => _.countBy(value, search => search.gender))
    // Make them percentages
    .thru(value => _.transform(value, (result, value, key) => {
      result[key] = ((value / total) * 100).toFixed(0);
    }, {}))
    // Converting the data to the chart format
    .thru(value => _.reduce(value, (result, value, key) => {
      const labels = {
        'f': 'Female',
        'm': 'Male',
        null: 'Unknown'
      }
      result.push({
        label: labels[key],
        value: `${value}%`
      });
      return result;
    }, []))
    .value();

  return {
    metrics: genderData,
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