import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import AutoWidth from 'app/common/components/AutoWidth';
import { loadOverview, filtersUpdate } from '../actions';
import { getUI } from 'app/core/selectors/ui';

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
import Dropdown from 'app/common/components/Dropdown';
import CampaignListContainer from '../containers/CampaignListContainer';

class Overview extends Component {

  componentDidMount() {
    this.props.actions.load();
  }

  render() {
    if(this.props.isCampaignSelected === false) {
      return (
        <DefaultLayout
          titleRender={_ => {
            return (
              <Titlebar title="Analytics / Select Campaign"/>
            );
          }}>
          <div className="container container--gutter">
            <CampaignListContainer/>
          </div>
        </DefaultLayout>
      );
    }

    const filterCTA = (
      <Dropdown>
        {props => {
          return (
            <div className={props.className}>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={props.onTriggerClick}>
                Filters
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <FilterBar/>
              </div>
            </div>
          );
        }}
      </Dropdown>
    );

    let notice;
    if(this.props.numberOfResults === 0) {
      notice = (
        <div className="alert alert-info" role="alert">
          Your selected filters has no results
        </div>
      );
    }

    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar title="Analytics"
              ctas={[filterCTA]}/>
          );
        }}>
        <div className="container container--gutter">
          {notice}

          {this._renderFilterTags()}

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

  _renderFilterTags() {
    const activeFilters = _.omitBy(this.props.filters, _.isNil);

    return (
      <ul className="list-unstyled clearfix">
        {_.map(activeFilters, (value, filter) => {
          return (
            <li className="pull-xs-left m-a-1">
              <button type="button" className="close" aria-label="Close" onClick={ () => this.props.onFilterRemoveClick(filter) }>
                <span aria-hidden="true">&times;</span>
              </button>
              {filter}: {value}
            </li>
          );
        })}
      </ul>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const ui = _.get(getUI(state), 'scene');

  const dropdownUI = _.find(ui, (x, key) => {
    return _.startsWith(key, 'Dropdown');
  });

  const filters = state.analytics.filters;

  return {
    filters,
    isCampaignSelected: !!filters.campaignId,
    dropdownOpen: _.get(dropdownUI, 'open'),
    numberOfResults: _.size(state.analytics.data.allSearches)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      load: _ => {
        dispatch(loadOverview());
      }
    },
    onFilterRemoveClick: (filter) => {
      dispatch(filtersUpdate({
        [filter]: null
      }));
    }
  };
};

let DecoratedComponent = Overview;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  key: 'scene',
  state: {
  }
})(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;