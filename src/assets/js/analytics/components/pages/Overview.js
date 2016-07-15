import React from 'react';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import AutoWidth from 'app/common/components/AutoWidth';

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
import Dropdown from 'app/common/components/Dropdown';
import CampaignListContainer from '../containers/CampaignListContainer';

const Overview = (props) => {
  if(props.isCampaignSelected === false) {
    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <Titlebar title={
              <FormattedMessage id="app.analytics.headerSelectCampaign" tagName="h1"/>
            }/>
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
  if(props.numberOfResults === 0) {
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
          <Titlebar
            title={
              <FormattedMessage id="app.analytics.header" tagName="h1"/>
            }
            ctas={[
              (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={ e => props.onCSVDownloadClick(props.filters) }>
                  Download CSV
                </button>
              ),
              filterCTA
            ]}/>
        );
      }}>
      <div className="container container--gutter">
        {notice}

        {renderFilterTags(props)}

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
};
Overview.displayName = 'AnalyticsOverviewPage';
Overview.propTypes = {

};

const renderFilterTags = (props) => {
  const activeFilters = _.omitBy(props.filters, _.isNil);

  return (
    <ul className="list-unstyled clearfix">
      {_.map(activeFilters, (value, filter) => {
        return (
          <li className="pull-xs-left m-a-1" key={filter}>
            <button type="button" className="close" aria-label="Close" onClick={ () => props.onFilterRemoveClick(filter) }>
              <span aria-hidden="true">&times;</span>
            </button>
            {filter}: {value}
          </li>
        );
      })}
    </ul>
  );
};

export default Overview;