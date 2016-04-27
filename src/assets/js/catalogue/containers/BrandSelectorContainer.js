import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import BrandSelectorList from 'app/common/components/brandSelector/BrandSelectorList';
import { getBrands } from 'app/core/selectors/entities/brands';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    brands: getBrands(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOptionClick: (e, brand) => {
      dispatch(updateModalPath('editBrand'));
      dispatch(updateModalData({
        brandId: brand.brandId
      }));
      dispatch(openModal());
    }
  };
}

let DecoratedComponent = BrandSelectorList;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;