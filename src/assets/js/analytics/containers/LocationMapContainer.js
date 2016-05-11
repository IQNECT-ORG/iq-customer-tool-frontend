import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import MarkerWithLabel from 'app/common/components/maps/MarkerWithLabel';

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

const render = (props) => {
  return (
    <GoogleMapLoader
      containerElement={
        <div style={{
          height: 500,
        }}/>
      }
      googleMapElement={
        <GoogleMap
          defaultZoom={3}
          defaultCenter={{lat: 0, lng: 0}}
          options={{
            styles: mapStyle
          }}
          onClick={_ => {}}>
          {props.markers.map((marker, index) => {
            return (
              <MarkerWithLabel {...marker}/>
            );
          })}
        </GoogleMap>
      }/>
  );
}

const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  const markers = _(allSearches)
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

  return {
    markers
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

let DecoratedComponent = render;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);

export default DecoratedComponent;