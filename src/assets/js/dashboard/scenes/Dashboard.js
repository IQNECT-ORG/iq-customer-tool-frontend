import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
import { loadDashboardPage } from '../actions';
import _ from 'lodash';
import { getBrands } from 'app/core/selectors/entities/brands';

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
        <div className="container">
          <div className="pane pane--filled">
            <div className="pane__body">
              <span>Campaigns</span>
              {this.props.campaignsCount}
            </div>
          </div>

          <div className="pane pane--filled">
            <div className="pane__body">
              <span>Matches</span>
              {this.props.matchesCount}
            </div>
          </div>

          <div className="pane pane--filled">
            <div className="pane__body">
              <span>Magazines</span>
              {this.props.triggersCount}
            </div>
          </div>

          <div className="pane pane--filled">
            <div className="pane__body">
              <span>Top Brands</span>
              <ul>
                {this._renderTopBrands()}
              </ul>
            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  _renderTopBrands() {
    return _.map(this.props.topBrands, (brand, index) => {
      return (
        <li key={index}>
          <img src={brand.imgPreview}/>
        </li>
      );
    });
  }

};

const mapStateToProps = (state, ownProps) => {
  const topBrandsIds = state.dashboard.topBrands;

  const topBrands = _.filter(getBrands(state), brand => {
    return _.includes(topBrandsIds, brand.brandId);
  });

  console.log(topBrands);

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

export default DecoratedComponent;