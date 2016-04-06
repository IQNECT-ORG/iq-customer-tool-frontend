import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaUploaderField from '../components/forms/MediaUploaderField';
import ui from 'redux-ui/transpiled';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onReferenceChange: ownProps.onChange,

    onChange: (e) => {
      // Do some sending away magic

      ownProps.onChange(1);
    }
  };
};

let DecoratedComponent = MediaUploaderField;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  state: {

  }
})(DecoratedComponent);

export default DecoratedComponent;