import React, { Component } from 'react';

class ResetPasswordForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor="formGroupExampleInput">Code</label>
          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input"
            {...fields.token}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="formGroupExampleInput2">Password</label>
          <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Another input"
            {...fields.password}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="formGroupExampleInput3">Password Match</label>
          <input type="password" className="form-control" id="formGroupExampleInput3" placeholder="Another input"
            {...fields.passwordMatch}/>
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

export default ResetPasswordForm;