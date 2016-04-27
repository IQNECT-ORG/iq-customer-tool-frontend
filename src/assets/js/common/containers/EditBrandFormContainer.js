import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddBrandForm from '../components/forms/AddBrandForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { brandEditFormSubmit } from '../actions/brands';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: ownProps.handleSubmit((values) => {
      return new Promise((resolve, reject) => {
        dispatch(brandEditFormSubmit({
          values: {
            brandId: values.brandId,
            image: values.artwork[0],
            name: values.name,
          },
          isModal: true,
          resolve,
          reject
        }));
      });
    })
  };
};

const fields = ['brandId', 'artwork', 'name'];

let DecoratedComponent = AddBrandForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'editBrand',
  fields,
},
(state, ownProps) => {
  const brand = ownProps.brand;

  return {
    initialValues: {
      brandId: brand.brandId,
      name: brand.name,
      media: brand.imgPreview
    }
  };
}
)(DecoratedComponent);

export default DecoratedComponent;