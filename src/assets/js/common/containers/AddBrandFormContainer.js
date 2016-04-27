import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddBrandForm from '../components/forms/AddBrandForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { brandAddFormSubmit } from '../actions/brands';

const mapStateToProps = (state, ownProps) => {
  return {
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

let DecoratedComponent = AddBrandForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'addBrand',
  fields,
}//,
// (state, ownProps) => {
//   const form = state.form[ownProps.referenceForm];

//   return {
//     initialValues: {
//       website: _.get(form, ownProps.referenceField).value
//     }
//   };
// }
)(DecoratedComponent);

export default DecoratedComponent;