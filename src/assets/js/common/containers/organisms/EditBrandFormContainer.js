import React, { Component } from 'react';
import { connect } from 'react-redux';
import BrandForm from '../../components/organisms/BrandForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { getBrands } from 'app/core/selectors/entities/brands';
//import { brandEditFormSubmit } from '../actions/brands';
import { createSelector } from 'reselect';

const FORM_KEY = 'editBrand';

const getBrandId = (state, props) => {
  return props.brandId;
};

const makeGetBrand = () => {
  const getBrand = createSelector(
    getBrands,
    getBrandId,
    (brands, brandId) => {
      return brands[brandId];
    }
  );

  return getBrand;
};

const makeMapStateToProps = () => {
  const getBrand = makeGetBrand();
  const mapStateToProps = (state, ownProps) => {
    const brand = getBrand(state, ownProps);

    return {
      brand: brand,
      flow: 'edit',
      initialValues: {
        brandId: brand.brandId,
        name: brand.name,
        media: brand.imgPreview
      }
    };
  };

  return mapStateToProps;
};


const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onSubmit: values => {
      return new Promise((resolve, reject) => {
        // dispatch(brandEditFormSubmit({
        //   values: {
        //     brandId: values.brandId,
        //     image: _.get(values, 'artwork.0'),
        //     name: values.name,
        //   },
        //   isModal: true,
        //   resolve,
        //   reject
        // }));
      });
    }
  });
};

const fields = ['brandId', 'artwork', 'name'];

let DecoratedComponent = BrandForm;
DecoratedComponent = reduxForm(
  {
    form: FORM_KEY,
    fields,
  }
)(DecoratedComponent);
DecoratedComponent = connect(
  makeMapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;