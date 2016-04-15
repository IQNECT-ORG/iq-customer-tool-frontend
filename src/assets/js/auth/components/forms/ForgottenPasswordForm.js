import React, { Component } from 'react';

class ForgottenPasswordForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor="formGroupExampleInput">Email</label>
          <input type="email" className="form-control" id="formGroupExampleInput" placeholder="Example input"
            {...fields.email}/>
        </fieldset>

        <div className="form-group row">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-primary">Reset my password</button>
          </div>
        </div>
      </form>
    );
  }
};

export default ForgottenPasswordForm;