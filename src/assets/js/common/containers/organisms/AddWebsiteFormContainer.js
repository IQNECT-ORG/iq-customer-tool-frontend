import React, { Component } from 'react';
import AddWebsiteForm from '../../components/organisms/AddWebsiteForm';
import { reduxForm } from 'redux-form';
import _ from 'lodash';
import { addWebsiteFormSubmit } from '../../signals';
import { bindActionCreators } from 'redux';

const FORM_KEY = 'addWebsite';

const mapStateToProps = (state, ownProps) => {
  const form = state.form[ownProps.referenceForm];

  return {
    initialValues: {
      website: _.get(form, ownProps.referenceField).value
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      addWebsiteFormSubmit
    }, dispatch)
  }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return _.assign({}, stateProps, dispatchProps, ownProps, {
    onSubmit: values => {
      dispatchProps.actions.addWebsiteFormSubmit({
        values,
        isModal: true,
        referenceForm: ownProps.referenceForm,
        referenceField: ownProps.referenceField
      });
    }
  })
};

const fields = ['website'];

let DecoratedComponent = AddWebsiteForm;
DecoratedComponent = reduxForm(
  {
    form: FORM_KEY,
    fields,
  },
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DecoratedComponent);

export default DecoratedComponent;