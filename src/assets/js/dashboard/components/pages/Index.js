import React, { Component } from 'react';
import DefaultLayout from 'app/common/components/templates/Default';
import Titlebar from 'app/common/components/molecules/TitlebarFactory';
import _ from 'lodash';
import BrandThumbnail from 'app/common/components/BrandThumbnail';

const Index = (props) => {
  return (
    <DefaultLayout
      titleRender={_ => {
        return (
          <Titlebar title="Dashboard"/>
        );
      }}>
      <div className="container container--gutter">
        <div className="row">
          <div className="col-xs-7">
            <div className="row">
              <div className="col-xs-4">
                <div className="pane pane--filled m-b-g">
                  <div className="pane__body">
                    <div>Campaigns</div>
                    {props.campaignsCount}
                  </div>
                </div>
              </div>

              <div className="col-xs-4">
                <div className="pane pane--filled">
                  <div className="pane__body">
                    <div>Matches</div>
                    {props.matchesCount}
                  </div>
                </div>
              </div>

              <div className="col-xs-4">
                <div className="pane pane--filled">
                  <div className="pane__body">
                    <div>Magazines</div>
                    {props.triggersCount}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12">
            <div className="pane pane--filled m-b-g">
              <div className="pane__body">
                <span>Top Brands</span>
                <ul className="row list-unstyled">
                  {renderTopBrands(props)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const renderTopBrands = (props) => {
  return _.map(props.topBrands, (brand, index) => {
    return (
      <li className="col-xs-2" key={index}>
        <BrandThumbnail brand={brand}/>
      </li>
    );
  });
}

Index.displayName = 'DashboardIndexPage';
Index.propTypes = {

};
export default Index;