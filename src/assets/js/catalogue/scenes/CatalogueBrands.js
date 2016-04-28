import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from 'app/common/components/layouts/Default';
import ui from 'redux-ui/transpiled';
import Titlebar from 'app/common/components/layout/titlebars/Factory';
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
            <Titlebar
              title="Manage / Brands"
              ctas={[(
                <button
                  className="btn btn-secondary btn-radius-lg btn-block"
                  type="button"
                  onClick={this.props.actions.openAddBrandModal}>
                  Add New Brand
                </button>
              )]}/>
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