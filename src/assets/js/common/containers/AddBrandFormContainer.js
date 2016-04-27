import React, { Component } from 'react';
import { connect } from 'react-redux';
import BrandForm from '../components/forms/BrandForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { brandAddFormSubmit } from '../actions/brands';

const mapStateToProps = (state, ownProps) => {
  return {
    flow: 'add'
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: ownProps.handleSubmit((values) => {
      return new Promise((resolve, reject) => {
        dispatch(brandAddFormSubmit({
          values: {
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

const fields = ['artwork', 'name'];

let DecoratedComponent = BrandForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'addBrand',
  fields,
})(DecoratedComponent);

export default DecoratedComponent;