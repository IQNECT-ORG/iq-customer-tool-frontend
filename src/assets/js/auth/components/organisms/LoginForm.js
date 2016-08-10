import React from 'react';
import Submit from 'app/common/components/atoms/Submit';

export default (props) => {
  const fields = props.fields;
  return (
    <form className="form--content" onSubmit={props.handleSubmit}>
      <fieldset className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          {...fields.email}/>
      </fieldset>
      <fieldset className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="password"
          {...fields.password}/>
      </fieldset>

      <div className="row">
        <div className="col-xs-12">
          <Submit
            className="btn btn-block btn-primary"
            isLoading={props.submitting}>
            Log in
          </Submit>
        </div>
      </div>
    </form>
  );
};