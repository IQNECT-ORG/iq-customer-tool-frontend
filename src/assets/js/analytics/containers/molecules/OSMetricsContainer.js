import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import fp from 'lodash/fp';
import moment from 'moment';
import Metrics from '../../components/molecules/Metrics';
import Metric from '../../components/molecules/Metric';
import { ChartColorScheme } from 'app/common/Constants';

const OSMetricsContainer = (props) => {
  return (
    <Metrics {...props} component={Metric}/>
  );
};

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  // Get the total number
  const total = _.size(allSearches);
  const osData = fp.flow(
    // Need to merge bad values down to unknown
    fp.transform(
      (result, search) => {
        const deviceType = search.deviceType;

        if(deviceType == null || deviceType === 'deviceType' || deviceType === 'null') {
          search.deviceType = 'Unknown'
        }

        result.push(search);
      },
      []
    ),
    // Count each type
    fp.countBy(search => search.deviceType),
    // Make them percentages
    fp.transform(
      (result, value, key) => {
        result[key] = ((value / total) * 100).toFixed(0);
      },
      {}
    ),
    // Converting the data to the chart format
    fp.reduce(
      (result, value, key) => {
        result.push({
          label: key,
          value: `${value}%`
        });
        return result;
      },
      []
    )
  )(allSearches);

  return {
    metrics: osData,
    colorScheme: ChartColorScheme
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = OSMetricsContainer;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;