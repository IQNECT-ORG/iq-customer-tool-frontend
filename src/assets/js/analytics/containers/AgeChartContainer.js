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
      title='Age'/>
  );
}

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  const ageData = _(allSearches)
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
    .thru(value => _.transform(value, (result, value, key) => {
      result.push({
        label: key >> 0,
        value: value
      });
    }, []))
    .value();

  console.log(ageData);

  return {
    chartData: ageData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = render;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;