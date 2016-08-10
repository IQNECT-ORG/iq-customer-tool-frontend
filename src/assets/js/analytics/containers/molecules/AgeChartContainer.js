import React from 'react';
import { connect } from 'react-redux';
import rd3 from 'rd3';
import fp from 'lodash/fp';
import moment from 'moment';
import { ChartColorScheme } from 'app/common/Constants';

const render = (props) => {
  if(props.chartData == null) {
    return null;
  }

  return (
    <rd3.PieChart
      data={props.chartData}
      width={props.width}
      height={props.width}
      radius={props.width / 2}
      innerRadius={(props.width / 4)}
      colors={segment => {
        return ChartColorScheme[segment];
      }}
      showInnerLabels={false}
      showOuterLabels={false}
      title='Age'/>
  );
};

const mapStateToProps = (state) => {
  //const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;
  let ageData = null;

  if(allSearches != null) {
    ageData = fp.flow(
      fp.reduce(
        (result, search) => {
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
        },
        {
          0: 0, // 0-24
          1: 0, // 25-44
          2: 0, // 45+
          3: 0 // Unknown
        }
      ),
      fp.transform(
        (result, value, key) => {
          result.push({
            label: key >> 0,
            value: value
          });
        },
        []
      )
    )(allSearches);
  }

  return {
    chartData: ageData
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

let DecoratedComponent = render;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;