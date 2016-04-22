import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/Titlebar';
import { loadBrandCatalogue } from '../actions';
import BrandSelectorContainer from '../containers/BrandSelectorContainer';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

class CatalogueBrands extends Component {

  componentDidMount() {
    this.props.actions.load();
  }

  render() {
    return (
      <DefaultLayout
        titleRender={_ => {
          return (
            <div className="container-fluid">
              <div className="row">
                <Titlebar className="col-xs-12">
                  <div className="row">
                    <div className="col-xs-6">
                      <h1>Catalogue / Brands</h1>
                    </div>
                    <div className="col-xs-2 col-xs-push-4">
                      <button
                        className="btn btn-secondary btn-radius-lg btn-block"
                        type="button"
                        onClick={this.props.actions.openAddBrandModal}>
                        Add New Brand
                      </button>
                    </div>
                  </div>
                </Titlebar>
              </div>
            </div>
          );
        }}>
        <div className="container container--gutter">
          <BrandSelectorContainer/>
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
        dispatch(loadBrandCatalogue());
      },

      openAddBrandModal: _ => {
        dispatch(updateModalPath('addBrand'));
        dispatch(updateModalData({
        }));
        dispatch(openModal());
      }
    }
  };
};

let DecoratedComponent = CatalogueBrands;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
})(DecoratedComponent);

export default DecoratedComponent;