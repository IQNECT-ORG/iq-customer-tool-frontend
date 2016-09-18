import React from 'react';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
import AutoWidth from 'app/common/components/AutoWidth';

import OverallChartContainer from '../../containers/molecules/OverallChartContainer';
import AgeChartContainer from '../../containers/molecules/AgeChartContainer';
import GenderChartContainer from '../../containers/molecules/GenderChartContainer';
import OSChartContainer from '../../containers/molecules/OSChartContainer';
import LocationMapContainer from '../../containers/molecules/LocationMapContainer';

import OverallMetricsContainer from '../../containers/molecules/OverallMetricsContainer';
import AgeMetricsContainer from '../../containers/molecules/AgeMetricsContainer';
import GenderMetricsContainer from '../../containers/molecules/GenderMetricsContainer';
import OSMetricsContainer from '../../containers/molecules/OSMetricsContainer';

import FilterBar from '../molecules/FilterBar';
import Dropdown from 'app/common/components/Dropdown';
import CampaignListContainer from '../../containers/molecules/CampaignListContainer';

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
  let content;
  if(props.numberOfResults === 0) {
    notice = (
      <div className="alert alert-info" role="alert">
        Your selected filters has no results
      </div>
    );

    content = null;
  } else {
    content = (
      <div>
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

        {content}
      </div>
    </DefaultLayout>
  );
};
Overview.displayName = 'AnalyticsOverviewPage';
Overview.propTypes = {

};

const renderFilterTags = (props) => {
  const activeFilters = _.omitBy(props.filters, _.isNil);

  const renderDate = (date) => moment(date).format('DD/MM/YYYY');

  const renderAsIs = (v) => v;

  const renderCampaignId = (campaignId) => {
    const campaignName = _.get(props, ['campaign', 'name']);
    return `(${campaignId}) ${campaignName}`;
  };

  const filterDisplayLookup = {
    campaignId: {
      label: 'Campaign',
      value: renderCampaignId
    },
    periodStart: {
      label: 'Period Start',
      value: renderDate
    },
    periodEnd: {
      label: 'Period End',
      value: renderDate
    },
    triggerId: {
      label: 'Trigger',
      value: renderAsIs
    },
    frameId: {
      label: 'Frame',
      value: renderAsIs
    }
  };

  return (
    <ul className="list-unstyled clearfix">
      {_.map(activeFilters, (value, filter) => {
        const lookedup = filterDisplayLookup[filter];

        return (
          <li className="pull-xs-left m-y-1 m-r-1" key={filter}>
            <span className="tag tag-default">
              <button type="button" className="close m-l-1" aria-label="Close" onClick={ () => props.onFilterRemoveClick(filter) }>
                <span aria-hidden="true">&times;</span>
              </button>
              <span style={{
                display: 'inline-block',
                transform: 'translateY(50%)'
              }}>
                {lookedup.label}: {lookedup.value(value)}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Overview;