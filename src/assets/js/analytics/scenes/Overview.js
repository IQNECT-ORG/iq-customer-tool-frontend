import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import AutoWidth from 'app/common/components/AutoWidth';
import { loadOverview } from '../actions';
import OverallChartContainer from '../containers/OverallChartContainer';
import AgeChartContainer from '../containers/AgeChartContainer';
import GenderChartContainer from '../containers/GenderChartContainer';
import OSChartContainer from '../containers/OSChartContainer';
import LocationMapContainer from '../containers/LocationMapContainer';

import _ from 'lodash';



class Overview extends Component {

  componentDidMount() {
    this.props.actions.load();
  }

  render() {
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
                        <OverallChartContainer width={props.autoWidth}/>
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
                            <AgeChartContainer width={props.autoWidth}/>
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
                  <div className="row">
                    <div className="col-xs-6 col--tight">
                      <AutoWidth dryRun={true}>
                        {props => {
                          return (
                            <GenderChartContainer width={props.autoWidth}/>
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
                  <div className="row">
                    <div className="col-xs-6 col--tight">
                      <AutoWidth dryRun={true}>
                        {props => {
                          return (
                            <OSChartContainer width={props.autoWidth}/>
                          );
                        }}
                      </AutoWidth>
                    </div>

                    <div className="col-xs-6">
                      X% iOS
                      Y% Android
                      Z% Unknown
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pane pane--filled">
            <div className="pane__body">
              <LocationMapContainer/>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
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