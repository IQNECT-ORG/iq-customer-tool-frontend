import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BrandForm from '../../components/organisms/BrandForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { brandAddFormSubmit } from '../../signals';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      brandAddFormSubmit
    }, dispatch)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    flow: 'add',
    onSubmit: values => {
      return new Promise((resolve, reject) => {
        dispatchProps.actions.brandAddFormSubmit({
          values: {
            media: values.artwork[0],
            name: values.name,
          },
          isModal: true,
          resolve,
          reject
        });
      });
    }
  });
};

const FORM_KEY = 'addBrand';
const fields = ['artwork', 'name'];

let DecoratedComponent = BrandForm;
DecoratedComponent = reduxForm({
  form: FORM_KEY,
  fields,
})(DecoratedComponent);
DecoratedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;