import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateCouponForm from '../components/forms/CreateCouponForm';
import ui from 'redux-ui/transpiled';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { change } from 'redux-form/lib/actions';
import { openModal, updateModalPath, updateModalData } from 'app/modal/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const fields = _.cloneDeep(ownProps.fields);
  fields.validityFrom.onChange = (value) => {
    const changeAction = change('validityFrom', value);
    changeAction.form = 'createCoupon';
    dispatch(changeAction);
  };

  fields.validityTo.onChange = (value) => {
    const changeAction = change('validityTo', value);
    changeAction.form = 'createCoupon';
    dispatch(changeAction);
  };

  return {
    fields,
    onSubmit: ownProps.handleSubmit((...args) => {
      ownProps.onFormSubmit(...args);
    }),
    onPreviewClick: e => {
      dispatch(updateModalPath('previewCoupon'));
      // @TODO: Need a means of holding the hold data and restoring
      dispatch(updateModalData({
      }));
      dispatch(openModal());
    }
  };
};

const fields = ['artwork', 'couponName', 'discountCode', 'validityFrom', 'validityTo'];

let DecoratedComponent = CreateCouponForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = reduxForm({
  form: 'createCoupon',
  fields
})(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;