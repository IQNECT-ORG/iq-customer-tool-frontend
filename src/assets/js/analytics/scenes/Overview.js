import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';

import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import MarkerWithLabel from 'app/common/components/maps/MarkerWithLabel';

import rd3 from 'rd3';
import _ from 'lodash';
import moment from 'moment';

const rawData = {"allSearches":[{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280567,"long":103.845847,"timestamp":1461833342.7299,"relTime":"2016-04-28 16:49:02.000000","age":33,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHXHCCu2gVRLjsIQAQsl6_exzit8zOKCCSl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHXHCCu2gVRLjsIQAQsl6_exzit8zOKCCSQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280597,"long":103.845862,"timestamp":1461833530.1187,"relTime":"2016-04-28 16:52:09.000000","age":33,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHVw0d3wkz9F2nHwPJd2ZIKC16MFkOJR7Il_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHVw0d3wkz9F2nHwPJd2ZIKC16MFkOJR7IQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280597,"long":103.845862,"timestamp":1461833580.7908,"relTime":"2016-04-28 16:53:00.000000","age":33,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHXHCCu2gVRLjIcenTAh4FqdHS-Yfz4Cz9l_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHXHCCu2gVRLjIcenTAh4FqdHS-Yfz4Cz9QGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280595,"long":103.845861,"timestamp":1461834616.4011,"relTime":"2016-04-28 17:10:16.000000","age":33,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHOExl-I0CHLhoVoxrTil8qDvNAEUIQq-Nl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHOExl-I0CHLhoVoxrTil8qDvNAEUIQq-NQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280594,"long":103.845878,"timestamp":1461834705.0105,"relTime":"2016-04-28 17:11:44.000000","age":33,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHXHCCu2gVRLgp5KBRAinRtlZIsznUUfwSl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHXHCCu2gVRLgp5KBRAinRtlZIsznUUfwSQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280585,"long":103.845868,"timestamp":1461834742.9858,"relTime":"2016-04-28 17:12:22.000000","age":33,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHXHCCu2gVRLg3gAXQjMKP3C6G_M-idkBOl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUHXHCCu2gVRLg3gAXQjMKP3C6G_M-idkBOQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280594,"long":103.845878,"timestamp":1461834802.616,"relTime":"2016-04-28 17:13:22.000000","age":33,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUH_N11TQ3hevEwzcA1noQaNCg4EV52tnsAl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn7VdbO6b6hUH_N11TQ3hevEwzcA1noQaNCg4EV52tnsAQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280587,"long":103.845848,"timestamp":1461895039.9959,"relTime":"2016-04-29 09:57:19.000000","age":0,"gender":"","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJV_N11TQ3hevF8NnbYN-Q8wU258Ni1qLhnl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJV_N11TQ3hevF8NnbYN-Q8wU258Ni1qLhnQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":0,"long":0,"timestamp":1461895351.2601,"relTime":"2016-04-29 10:02:31.000000","age":65,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJVVw0d3wkz9F2rh-kNG0jjm9T3WxJnsdeVl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJVVw0d3wkz9F2rh-kNG0jjm9T3WxJnsdeVQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280598,"long":103.845884,"timestamp":1461898245.6251,"relTime":"2016-04-29 10:50:45.000000","age":33,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJVOExl-I0CHLj4X0QvDlAbD2TKfBm5ANuwl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJVOExl-I0CHLj4X0QvDlAbD2TKfBm5ANuwQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.280598,"long":103.845884,"timestamp":1461898246.5417,"relTime":"2016-04-29 10:50:46.000000","age":33,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJV_N11TQ3hevG5xp4LZ2roGEDUbUVq2U41l_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJV_N11TQ3hevG5xp4LZ2roGEDUbUVq2U41QGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":1.2806,"long":103.845859,"timestamp":1461898377.5171,"relTime":"2016-04-29 10:52:57.000000","age":65,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJVOExl-I0CHLiXL8PU9mYrjm1mYZhrbnNZl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-Usn8YJqfJVOExl-I0CHLiXL8PU9mYrjm1mYZhrbnNZQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":0,"long":0,"timestamp":1462348696.116,"relTime":"2016-05-04 07:58:16.000000","age":16,"gender":"m","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIjOExl-I0CHLhRsImcwToTIHCVe-bhXctNl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIjOExl-I0CHLhRsImcwToTIHCVe-bhXctNQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":0,"long":0,"timestamp":1462348874.3101,"relTime":"2016-05-04 08:01:14.000000","age":0,"gender":"","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIjXHCCu2gVRLgUrn_Z-DezDbhp8Vy2Jjqrl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIjXHCCu2gVRLgUrn_Z-DezDbhp8Vy2JjqrQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":0,"long":0,"timestamp":1462350111.1159,"relTime":"2016-05-04 08:21:51.000000","age":0,"gender":"f","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIjOExl-I0CHLik3IRKkEzkg-I0aDkIcPZXl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIjOExl-I0CHLik3IRKkEzkg-I0aDkIcPZXQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":0,"long":0,"timestamp":1462350284.3328,"relTime":"2016-05-04 08:24:44.000000","age":26,"gender":"f","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIj_N11TQ3hevEmUsI3FpLu9IiyaJxGn93Hl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIj_N11TQ3hevEmUsI3FpLu9IiyaJxGn93HQGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":0,"long":0,"timestamp":1462350362.9008,"relTime":"2016-05-04 08:26:02.000000","age":26,"gender":"","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIjVw0d3wkz9F0GehmxLm4ZzCCgInLSe-c5l_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIjVw0d3wkz9F0GehmxLm4ZzCCgInLSe-c5QGGKINJOky9TkYoSJVPuwQ=="},{"brandId":12,"campaignId":84,"triggerId":105,"lat":0,"long":0,"timestamp":1462350364.3064,"relTime":"2016-05-04 08:26:04.000000","age":26,"gender":"","keyword":null,"imgPreview":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIj_N11TQ3hevEF78NDzTau2Ph0_KSKiBlsl_lcgtAP1CDiq4LUAkL0vg==","imgFullsize":"\/\/dev-static.iqnect.org\/PGtA0O6CD9SGovcw-QeKtCZPC8AoH0oaZfD_1DDQDlS5x_-eORXJn-k5Q3EQpMIj_N11TQ3hevEF78NDzTau2Ph0_KSKiBlsQGGKINJOky9TkYoSJVPuwQ=="}]}

console.log(rawData);

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

var lineData = [
  {
    name: 'series1',
    values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ]
  },
  // {
  //   name: 'series2',
  //   values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
  // },
  // {
  //   name: 'series3',
  //   values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
  // }
];

var pieData = [{label: "Margarita", value: 20.0}, {label: "John", value: 55.0}, {label: "Tim", value: 25.0 }];

class Overview extends Component {

  render() {
    const markers = [
      {
        position: {
          lat: 0,
          lng: 0,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
        icon: markerIcon,
        labelContent: "$425K",
        //labelAnchor: new google.maps.Point(22, 0),
        labelClass: "labels", // the CSS class for the label,
        labelAnchor: new google.maps.Point(20, 20)
      },
      {
        position: {
          lat: 0,
          lng: 0,
        },
        key: `Taiwan2`,
        defaultAnimation: 2
      }
    ];

    const timespan = {};
    _.times(12, n => {
      const date = moment([2016, n]);
      timespan[date.unix()] = {
        x: date.toDate(),
        y: 0
      };
    });

    const wow = _(rawData.allSearches)
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

    lineData[0].values = wow;

    console.log(wow);

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
              <rd3.LineChart
                legend={false}
                data={lineData}
                width='100%'
                height={400}
                viewBoxObject={{
                  x: 0,
                  y: 0,
                  width: 500,
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
                }}
              />
            </div>
          </div>

          <div className="pane pane--filled">
            <div className="pane__body">
              <rd3.PieChart
                data={pieData}
                width={450}
                height={400}
                radius={110}
                innerRadius={50}
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
                title='Gender Analytics'/>
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
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
    }
  };
};

let DecoratedComponent = Overview;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);

export default DecoratedComponent;