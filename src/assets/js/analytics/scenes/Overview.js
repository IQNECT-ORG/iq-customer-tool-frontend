import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import AutoWidth from 'app/common/components/AutoWidth';
import { loadOverview } from '../actions';

import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import MarkerWithLabel from 'app/common/components/maps/MarkerWithLabel';

import rd3 from 'rd3';
import _ from 'lodash';
import moment from 'moment';

const mapStyle = [
  {
    'featureType': 'all',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  }
];

var barData = [
  {
    "name": "Series A",
    "values": [
      { "x": 1, "y": 91},
      { "x": 2, "y": 290},
      { "x": 3, "y": 50},
      { "x": 4, "y": 90},
    ]
  }
];

class Overview extends Component {

  componentDidMount() {
    this.props.actions.load();
  }

  render() {
    // const markers = [
    //   {
    //     position: {
    //       lat: 0,
    //       lng: 0,
    //     },
    //     key: `Taiwan`,
    //     defaultAnimation: 2,
    //     icon: markerIcon,
    //     labelContent: "$425K",
    //     //labelAnchor: new google.maps.Point(22, 0),
    //     labelClass: "labels", // the CSS class for the label,
    //     labelAnchor: new google.maps.Point(20, 20)
    //   },
    //   {
    //     position: {
    //       lat: 0,
    //       lng: 0,
    //     },
    //     key: `Taiwan2`,
    //     defaultAnimation: 2
    //   }
    // ];

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
        name: 'series1',
        values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ]
      }
    ];

    const overallData = _(this.props.data.allSearches)
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

    const genderData = _(this.props.data.allSearches)
      // Count each gender type
      .thru(value => _.countBy(value, search => search.gender))
      // Calculate the total of all genders
      .thru(value => _.reduce(value, (result, count) => {
        result.total += count;
        return result;
      }, {
        total: 0,
        data: value
      }))
      // Work out the percentage
      .thru(value => _.reduce(value.data, (result, count, key) => {
        result[key] = (count / value.total) * 100;
        return result;
      }, value.data))
      // Converting the data to the chart format
      .thru(value => _.reduce(value, (result, percentage, key) => {
        result.push({
          label: key,
          value: percentage
        });
        return result;
      }, []))
      .value();

    console.log(this.props.data.allSearches);

    const markers = _(this.props.data.allSearches)
      .thru(value => _.reduce(value, (result, search) => {
        const key = `${search.lat}:${search.long}`;
        result[key] = {
          position: {
            lat: search.lat,
            lng: search.long,
          },
          key: key,
          defaultAnimation: 2,
          icon: markerIcon,
          labelContent: '1',
          //labelAnchor: new google.maps.Point(22, 0),
          labelClass: 'labels', // the CSS class for the label,
          labelAnchor: new google.maps.Point(20, 20)
        };
        return result;
      }, {}))
      .thru(_.toArray)
      .value();

    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar title="Analytics"/>
          );
        }}>
        <div className="container">
          <div className="pane pane--filled">
            <div className="pane__body">
              <div className="row">
                <div className="col-xs-10 col--tight">
                  <AutoWidth dryRun={true}>
                    {props => {
                      return (
                        <rd3.LineChart
                          legend={false}
                          data={lineData}
                          width='100%'
                          height={400}
                          viewBoxObject={{
                            x: 0,
                            y: 0,
                            width: props.autoWidth,
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
                    }}
                  </AutoWidth>
                </div>
                <div className="col-xs-2">
                  Number of scans
                  Unique scans
                  Average scan per user
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-4 col--tight">
              <div className="pane pane--filled">
                <div className="pane__body">
                  <div className="row">
                    <div className="col-xs-6 col--tight">
                      <AutoWidth dryRun={true}>
                        {props => {
                          return (
                            <rd3.PieChart
                              data={genderData}
                              width={props.autoWidth}
                              height={props.autoWidth}
                              radius={props.autoWidth / 2}
                              innerRadius={(props.autoWidth / 4)}
                              colors={segment => {
                                const colors = [
                                  '#e91e63',
                                  '#00bcd4',
                                  '#37474f'
                                ];
                                return colors[segment];
                              }}
                              showInnerLabels={false}
                              showOuterLabels={false}
                              title='Gender'/>
                          );
                        }}
                      </AutoWidth>
                    </div>

                    <div className="col-xs-6">
                      X% Female
                      Y% Male
                      Z% Unknown
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xs-4 col--tight">
              <div className="pane pane--filled">
                <div className="pane__body">
                  <AutoWidth dryRun={true}>
                    {props => {
                      return (
                        <rd3.BarChart
                          data={barData}
                          width={props.autoWidth}
                          height={props.autoWidth}
                          title='Age'
                          colors={ series => {
                            return '#e91e63';
                          }}
                          xAxisLabel=''
                          yAxisLabel=''
                          xAxisFormatter={ tick => {
                            const zones = {
                              1: '0-24',
                              2: '25-44',
                              3: '45-64',
                              4: '65+'
                            };

                            return zones[tick];
                          }}/>
                      );
                    }}
                  </AutoWidth>
                </div>
              </div>
            </div>

            <div className="col-xs-4 col--tight">
              <div className="pane pane--filled">
                <div className="pane__body">
                  <AutoWidth dryRun={true}>
                    {props => {
                      return (
                        <rd3.BarChart
                          data={barData}
                          width={props.autoWidth}
                          height={props.autoWidth}
                          title='OS'
                          colors={ series => {
                            return '#00bcd4';
                          }}
                          xAxisLabel=''
                          yAxisLabel=''
                          xAxisFormatter={ tick => {
                            const zones = {
                              1: 'AND',
                              2: 'IOS',
                              3: 'BB',
                              4: 'OTR'
                            };

                            return zones[tick];
                          }}/>
                      );
                    }}
                  </AutoWidth>
                </div>
              </div>
            </div>
          </div>

          <div className="pane pane--filled">
            <div className="pane__body">
              <GoogleMapLoader
                containerElement={
                  <div
                    {...this.props}
                    style={{
                      height: 500,
                    }}
                  />
                }
                googleMapElement={
                  <GoogleMap
                    defaultZoom={3}
                    defaultCenter={{lat: 0, lng: 0}}
                    options={{
                      styles: mapStyle
                    }}
                    onClick={_ => {}}>
                    {markers.map((marker, index) => {
                      return (
                        <MarkerWithLabel {...marker}/>
                      );
                    })}
                  </GoogleMap>
                }/>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
};

const path = 'M 100, 100, m -75, 0, a 75,75 0 1,0 150,0, a 75,75 0 1,0 -150,0';

const markerIcon = {
  path: path,
  fillColor: '#e91e63',
  fillOpacity: 1,
  scale: 1,
  // strokeColor: '#e91e63',
  strokeWeight: 0,
  anchor: new google.maps.Point(100,100)
};

const mapStateToProps = (state, ownProps) => {
  return {
    filters: state.analytics.filters,
    data: state.analytics.data
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      load: _ => {
        dispatch(loadOverview());
      }
    }
  };
};

let DecoratedComponent = Overview;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);

export default DecoratedComponent;