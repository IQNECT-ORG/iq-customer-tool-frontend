import React, { Component } from 'react';

class ForgottenPasswordForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor="formGroupExampleInput">Email Address</label>
          <input type="email" className="form-control" id="formGroupExampleInput" placeholder="Example input"
            {...fields.email}/>
        </fieldset>

        <div className="row">
          <div className="col-xs-12">
            <button type="submit" className="btn btn-primary btn-block">Reset my password</button>
          </div>
        </div>
      </form>
    );
  }
};

export default ForgottenPasswordForm;