import React, { Component } from 'react';
import { connect } from 'react-redux';
import rd3 from 'rd3';
import _ from 'lodash';
import moment from 'moment';

const render = (props) => {
  return (
    <rd3.LineChart
      legend={false}
      data={props.chartData}
      width='100%'
      height={400}
      viewBoxObject={{
        x: 0,
        y: 0,
        width: props.width,
        height: 400
      }}
      colors={ series => {
        const colors = [
          '#e91e63',
          '#00bcd4',
          '#37474f'
        ];
        return colors[series];
      }}
      interpolationType='monotone'
      title='Overall Data'
      yAxisLabel=''
      xAxisLabel=''
      gridHorizontal={true}
      gridHorizontalStrokeDash='0'
      gridHorizontalStroke='#eceff1'
      circleRadius={0}
      domain={{
        x: [new Date(2016, 0, 1), new Date(2016, 11, 31)],
        y: [0, null]
      }}/>
  );
}

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  const timespan = {};
  _.times(12, n => {
    const date = moment([2016, n]);
    timespan[date.unix()] = {
      x: date.toDate(),
      y: 0
    };
  });

  var lineData = [
    {
      name: 'series1'
    }
  ];

  const overallData = _(allSearches)
    .sortBy('timestamp')
    .thru(value => {
      return _.reduce(value, (result, search) => {
        const date = moment.unix(search.timestamp);
        date.startOf('month');

        const key = date.unix();

        if(result[key]) {
          result[key].y++;
        } else {
          result[key] = {
            x: date.toDate(),
            y: 1,
          }
        }

        return result;
      }, timespan)
    })
    .thru(_.toArray)
    .value();

  lineData[0].values = overallData;

  return {
    chartData: lineData
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = render;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;