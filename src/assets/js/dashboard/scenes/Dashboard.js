import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import { loadDashboardPage } from '../actions';
import _ from 'lodash';
import { getBrands } from 'app/core/selectors/entities/brands';
import AuthenticationRequiredContainer from 'app/common/containers/AuthenticationRequiredContainer';

class Dashboard extends Component {

  componentWillMount() {
    this.props.actions.load();
  }

  render() {
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
                      {this.props.campaignsCount}
                    </div>
                  </div>
                </div>

                <div className="col-xs-4">
                  <div className="pane pane--filled">
                    <div className="pane__body">
                      <div>Matches</div>
                      {this.props.matchesCount}
                    </div>
                  </div>
                </div>

                <div className="col-xs-4">
                  <div className="pane pane--filled">
                    <div className="pane__body">
                      <div>Magazines</div>
                      {this.props.triggersCount}
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
                    {this._renderTopBrands()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  _renderTopBrands() {
    return _.map(this.props.topBrands, (brand, index) => {
      return (
        <li className="col-xs-2" key={index}>
          <img src={brand.imgPreview}/>
          <span>{brand.name}</span>
        </li>
      );
    });
  }

};

const mapStateToProps = (state, ownProps) => {
  const topBrandsIds = state.dashboard.topBrands;

  const topBrands = _.filter(getBrands(state), brand => {
    // Have to cast string to int due to differences in the API.
    return _.includes(topBrandsIds, brand.brandId >> 0);
  });

  return {
    campaignsCount: state.dashboard.campaignsCount,
    triggersCount: state.dashboard.triggersCount,
    matchesCount: state.dashboard.matchesCount,
    topBrands
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      load: _ => {
        dispatch(loadDashboardPage());
      }
    }
  };
};

let DecoratedComponent = Dashboard;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);
DecoratedComponent = AuthenticationRequiredContainer()(DecoratedComponent);

export default DecoratedComponent;