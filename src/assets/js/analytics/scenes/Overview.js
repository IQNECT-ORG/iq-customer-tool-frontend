import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';

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

    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar title="Analytics"/>
          );
        }}>
        <div className="container" style={{
          height: 500
        }}>
          <GoogleMapLoader
            containerElement={
              <div
                {...this.props}
                style={{
                  height: "100%",
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                ref={(map) => console.log(map)}
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
            }
          />
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