import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import MarkerWithLabel from 'app/common/components/maps/MarkerWithLabel';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import ui from 'redux-ui/transpiled';

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
  scale: 0.25,
  // strokeColor: '#e91e63',
  strokeWeight: 0,
  anchor: new google.maps.Point(100,100)
};

const clusterStyle = {
  width: 50,
  height: 50,
  url: 'http://www.thetimes.co.uk/tto/multimedia/archive/00968/ad0f2a3e-50df-11e5-_968539c.jpg'
};

const eventWrapper = (fn) => {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(this.refs.map);
    fn.apply(null, args);
  }
};

class LocationMap extends Component {
  render() {
    return (
      <GoogleMapLoader
        containerElement={
          <div style={{
            height: 500,
          }}/>
        }
        googleMapElement={
          <GoogleMap
            ref="map"
            defaultZoom={this.props.ui.zoom}
            defaultCenter={{lat: 0, lng: 0}}
            options={{
              styles: mapStyle
            }}
            onClick={_ => {}}
            onZoomChanged={eventWrapper(this.props.onZoomChanged).bind(this)}>
            <MarkerClusterer styles={[clusterStyle]}>
              {this.props.markers.map((marker, index) => {
                return (
                  <MarkerWithLabel {...marker}/>
                );
              })}
            </MarkerClusterer>
          </GoogleMap>
        }/>
    );
  }
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
        labelContent: 1,
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
    onZoomChanged: (mapComponent) => {
      const map = mapComponent.props.map;

      ownProps.updateUI('zoom', map.zoom);
    }
  };
};

let DecoratedComponent = LocationMap;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  state: {
    zoom: 3
  }
})(DecoratedComponent);


export default DecoratedComponent;