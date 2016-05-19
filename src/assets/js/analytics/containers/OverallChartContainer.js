import React, { Component } from 'react';
import { connect } from 'react-redux';
import rd3 from 'rd3';
import _ from 'lodash';
import moment from 'moment';
import colorScheme from '../colorScheme';

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
        return colorScheme[series];
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
        x: [
          new Date(_.parseInt(props.filters.periodStart)),
          new Date(_.parseInt(props.filters.periodEnd))],
        y: [0, null]
      }}/>
  );
}

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  let scope;
  let periodStart = moment(_.parseInt(filters.periodStart));
  let periodEnd = moment(_.parseInt(filters.periodEnd));
  let diff = periodEnd.diff(periodStart);
  let duration = moment.duration(diff);
  let durations = {
    hours: duration.asHours(),
    days: duration.asDays(),
    weeks: duration.asWeeks(),
    months: duration.asMonths(),
    years: duration.asYears()
  };

  {

    console.log(durations)

    if(durations.years >= 2) {
      scope = 'years';
    } else if(durations.months >= 4) {
      scope = 'months';
    } else if(durations.weeks >= 4) {
      scope = 'weeks';
    } else if(durations.days >= 4) {
      scope = 'days';
    } else {
      scope = 'hours';
    }
  }

  const span = Math.abs(durations[scope]);
  
  const timespan = {};
  _.times(span, n => {
    const date = moment(periodStart);
    date.add(n, scope);

    timespan[date.unix()] = {
      x: date.toDate(),
      y: 0
    };
  });

  var lineData = [
    {
      name: 'Number of Scans',
      strokeWidth: 3
    },
    {
      name: 'Unique Scans',
      strokeWidth: 3
    }
  ];

  const overallData = _(allSearches)
    .sortBy('timestamp')
    .thru(value => {
      return _.reduce(value, (result, search) => {
        const date = moment.unix(search.timestamp);
        date.startOf('month');

        const key = date.unix();

        if(_.has(result, key)) {
          result[key].y++;
        } else {
          result[key] = {
            x: date.toDate(),
            y: 1,
          }
        }

        return result;
      }, _.clone(timespan))
    })
    .thru(_.toArray)
    .value();

  const uniqueData = _(allSearches)
    .sortBy('timestamp')
    .thru(value => _.transform(value, (result, search) => {
      const date = moment.unix(search.timestamp);
      date.startOf('month');

      const key = date.unix();

      if(_.has(result, key)) {
        if(_.has(result[key], 'deviceIds') === false) {
          result[key].deviceIds = [];
        }

        if(_.includes(result[key].deviceIds, search.deviceId) === false) {
          result[key].deviceIds.push(search.deviceId);
        }
      } else {
        result[key] = {
          x: date.toDate(),
          y: 1,
          deviceIds: [],
        }
      }
    }, _.clone(timespan)))
    .thru(value => _.transform(value, (result, search) => {
      result.push({
        x: search.x,
        y: _.size(search.deviceIds)
      });
    }, []))
    .value();

  lineData[0].values = overallData;
  lineData[1].values = uniqueData;

  return {
    filters: filters,
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