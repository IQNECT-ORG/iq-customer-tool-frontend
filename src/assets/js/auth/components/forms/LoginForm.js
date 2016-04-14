import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor="formGroupExampleInput">Email</label>
          <input type="email" className="form-control" id="formGroupExampleInput" placeholder="Example input"
            {...fields.email}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="formGroupExampleInput2">Password</label>
          <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Another input"
            {...fields.password}/>
        </fieldset>

        <div className="form-group row">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-secondary">Sign in</button>
          </div>
        </div>
      </form>
    );
  }
};

export default LoginForm;