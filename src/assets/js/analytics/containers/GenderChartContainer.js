import React, { Component } from 'react';
import { connect } from 'react-redux';
import rd3 from 'rd3';
import _ from 'lodash';
import moment from 'moment';
import colorScheme from '../colorScheme';

const render = (props) => {
  return (
    <rd3.PieChart
      data={props.chartData}
      width={props.width}
      height={props.width}
      radius={props.width / 2}
      innerRadius={(props.width / 4)}
      colors={segment => {
        return colorScheme[segment];
      }}
      showInnerLabels={false}
      showOuterLabels={false}
      title='Gender'/>
  );
}

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  const genderData = _(allSearches)
    // Count each gender type
    .thru(value => _.countBy(value, search => search.gender))
    // Converting the data to the chart format
    .thru(value => _.reduce(value, (result, count, key) => {
      result.push({
        label: key,
        value: count
      });
      return result;
    }, []))
    .value();

  return {
    chartData: genderData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = render;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;