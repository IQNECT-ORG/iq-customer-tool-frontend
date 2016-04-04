import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageDetailsForm from '../components/forms/PageDetailsForm';
import { openModal, updateModalPath } from 'app/modal/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackClick: (e) => {
      dispatch(prevStep());
    },

    onSubmit: (e) => {
      e.preventDefault();
      dispatch(nextStep());
    },

    onAddWebsiteClick: (e) => {
      dispatch(updateModalPath('addWebsite'));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {

    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageDetailsForm);