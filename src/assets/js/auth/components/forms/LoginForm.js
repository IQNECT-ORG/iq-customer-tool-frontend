import React, { Component } from 'react';

class LoginForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" className="form-control" id="email" placeholder="Example input"
            {...fields.email}/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Another input"
            {...fields.password}/>
        </fieldset>

        <div className="form-group row">
          <div className="col-xs-12">
            <button type="submit" className="btn btn-primary btn-block">Log in</button>
          </div>
        </div>
      </form>
    );
  }
};

export default LoginForm;