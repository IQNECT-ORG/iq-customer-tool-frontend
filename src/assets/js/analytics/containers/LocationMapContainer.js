import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import MarkerWithLabel from 'app/common/components/maps/MarkerWithLabel';
import ui from 'redux-ui/transpiled';
import geolib from 'geolib';

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
            {this.props.markers.map((marker, index) => {
              return (
                <MarkerWithLabel {...marker}/>
              );
            })}
          </GoogleMap>
        }/>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.ui.zoom);
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  const markers = _(allSearches)
    .thru(value => _.reduce(value, (result, search) => {
      const pool = _.find(result, poolItem => {
        console.log(geolib.getDistance(
          {
            latitude: search.lat,
            longitude: search.long
          },
          {
            latitude: poolItem.lat,
            longitude: poolItem.long
          }
        ));
        return geolib.isPointInCircle(
          {
            latitude: search.lat,
            longitude: search.long
          },
          {
            latitude: poolItem.lat,
            longitude: poolItem.long
          },
          10000 / (ownProps.ui.zoom + 1)
        );
      });

      if(pool == null) {
        result.push({
          lat: search.lat,
          long: search.long,
          count: 1
        });
      } else {
        pool.count++;
      }

      return result;
    }, []))
    .thru(value => _.reduce(value, (result, search) => {
      console.log(search.lat, search.long);
      const key = `${search.lat}:${search.long}`;
      result[key] = {
        position: {
          lat: search.lat,
          lng: search.long,
        },
        key: key,
        defaultAnimation: 2,
        icon: markerIcon,
        labelContent: search.count,
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