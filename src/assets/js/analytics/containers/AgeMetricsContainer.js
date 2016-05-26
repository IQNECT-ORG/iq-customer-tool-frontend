import { connect } from 'react-redux';
import fp from 'lodash/fp';
import _ from 'lodash';
import Metrics from '../components/Metrics';
import colorScheme from '../colorScheme';

const mapStateToProps = (state) => {
  //const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  // Get the total number
  const total = _.size(allSearches);
  const ageData = fp.flow(
    // Group and count
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
    // Make them percentages
    fp.map(count => ((count / total) * 100).toFixed(0)),
    // Pie format
    fp.transform(
      (result, value, key) => {
        const labels = {
          0: '0-24',
          1: '25-44',
          2: '45+',
          3: 'Unknown'
        };

        result.push({
          label: labels[key >> 0],
          value: `${value}%`
        });
      },
      []
    )
  )(allSearches);

  return {
    metrics: ageData,
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