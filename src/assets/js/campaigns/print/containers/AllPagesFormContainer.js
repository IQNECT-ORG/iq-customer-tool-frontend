import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllPagesForm from '../components/forms/AllPagesForm';
import { openModal, updateModalPath } from 'app/modal/actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackClick: () => {
    },

    onSubmit: () => {
    },

    onAddWebsiteClick: (e) => {
      dispatch(updateModalPath('addWebsite'));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {

    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPagesForm);