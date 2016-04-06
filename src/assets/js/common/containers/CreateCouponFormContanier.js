import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateCouponForm from '../components/forms/CreateCouponForm';
import ui from 'redux-ui/transpiled';
import { reduxForm } from 'redux-form';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: ownProps.handleSubmit((...args) => {
      console.log(args);
    })
  };
};

const fields = ['couponName'];

let DecoratedComponent = CreateCouponForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'createCoupon',
  fields
})(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;