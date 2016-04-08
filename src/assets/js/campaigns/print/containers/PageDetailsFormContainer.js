import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageDetailsForm from '../components/forms/PageDetailsForm';
import { openModal, updateModalPath } from 'app/modal/actions';
import ui from 'redux-ui/transpiled';

const mapStateToProps = (state, ownProps) => {
  return {
    page: ownProps.ui.page
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onBackClick: (e) => {
      if(ownProps.ui.page === 1) {
        ownProps.updateUI({
          step: ownProps.ui.step - 1,
          page: null
        });
      } else {
        ownProps.updateUI('page', ownProps.ui.page - 1)
      }
    },

    onSubmit: (...args) => {
      ownProps.updateUI({
        page: ownProps.ui.page + 1
      });
    },

    onAddWebsiteClick: (e) => {
      dispatch(updateModalPath('addWebsite'));
      dispatch(openModal());
    },

    onAddCouponClick: (e) => {

    }
  };
}



let DecoratedComponent = PageDetailsForm;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui()(DecoratedComponent);

export default DecoratedComponent;