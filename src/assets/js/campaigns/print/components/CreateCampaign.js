import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class CreateCampaign extends Component {
  render() {
    return (
      <div>
        {this._renderForm()}
      </div>
    );
  }

  _renderForm() {
    return React.createElement(
      this.props.components[this.props.step - 1],
      this.props
    );
  }
};

export default CreateCampaign;