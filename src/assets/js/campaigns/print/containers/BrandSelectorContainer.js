import React, { Component } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui/transpiled';
import BrandSelector from 'app/common/components/brandSelector/BrandSelector';
import { getBrands } from 'app/core/selectors/entities/brands';

const mapStateToProps = (state, ownProps) => {
  return {
    brands: getBrands(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
}

let DecoratedComponent = BrandSelector;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;