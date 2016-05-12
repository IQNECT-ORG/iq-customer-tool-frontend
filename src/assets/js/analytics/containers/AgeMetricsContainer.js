import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import Metrics from '../components/Metrics';

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  // Get the total number
  const total = _.size(allSearches);
  const ageData = _(allSearches)
    // Group and count
    .thru(value => _.reduce(value, (result, search) => {
      let key;
      const age = search.age;

      if(age == null) {
        result[3]++;
      } else if(age <= 24) {
        result[0]++;
      } else if(age <= 44) {
        result[1]++;
      } else {
        result[2]++;
      }

      return result;
    }, {
      0: 0, // 0-24
      1: 0, // 25-44
      2: 0, // 45+
      3: 0 // Unknown
    }))
    // Make them percentages
    .map(count => ((count / total) * 100).toFixed(0))
    // Pie format
    .thru(value => _.transform(value, (result, value, key) => {
      const labels = {
        0: '0-24',
        1: '25-44',
        2: '45+',
        3: 'Unknown'
      }

      result.push({
        label: labels[key >> 0],
        value: `${value}%`
      });
    }, []))
    .value();

  return {
    metrics: ageData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = Metrics;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;