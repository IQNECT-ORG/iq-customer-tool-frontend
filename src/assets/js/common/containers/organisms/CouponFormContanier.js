import React, { Component } from 'react';
import { connect } from 'react-redux';
import CouponForm from '../../components/organisms/CouponForm';
import ui from 'redux-ui/transpiled';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { change } from 'redux-form/lib/actions';
//import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // const fields = _.cloneDeep(ownProps.fields);
  // fields.validityFrom.onChange = (value) => {
  //   const changeAction = change('validityFrom', value);
  //   changeAction.form = 'coupon';
  //   dispatch(changeAction);
  // };

  // fields.validityTo.onChange = (value) => {
  //   const changeAction = change('validityTo', value);
  //   changeAction.form = 'coupon';
  //   dispatch(changeAction);
  // };

  return {
    fields,
    onSubmit: ownProps.handleSubmit((...args) => {
      ownProps.onFormSubmit(...args);
    })
  };
};

const fields = ['artwork', 'couponName', 'discountCode', 'validityFrom', 'validityTo'];

let DecoratedComponent = CouponForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'coupon',
  fields
},
(state, ownProps) => {
  const coupon = ownProps.coupon;

  return {
    initialValues: {
      couponName: _.get(coupon, 'title')
    }
  };
})(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;