import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
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

import OverallMetricsContainer from '../containers/OverallMetricsContainer';
import AgeMetricsContainer from '../containers/AgeMetricsContainer';
import GenderMetricsContainer from '../containers/GenderMetricsContainer';
import OSMetricsContainer from '../containers/OSMetricsContainer';

import FilterBar from '../components/filters/FilterBar';
import AuthenticationRequiredContainer from 'app/common/containers/AuthenticationRequiredContainer';

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

          <FilterBar/>

          <div className="pane pane--filled m-b-g">
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
                  <OverallMetricsContainer/>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-b-g">
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
                      <AgeMetricsContainer/>
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
                      <GenderMetricsContainer/>
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
                      <OSMetricsContainer/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pane pane--filled m-b-g">
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
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;