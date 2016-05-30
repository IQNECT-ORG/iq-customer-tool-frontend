import React from 'react';
import Submit from 'app/common/components/forms/Submit';

const render = (props) => {
  const fields = props.fields;
  return (
    <form className="form--content" onSubmit={props.onSubmit}>
      <fieldset className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          {...fields.email}/>
      </fieldset>

      <div className="row">
        <div className="col-xs-12">
          <Submit
            className="btn btn-block btn-primary"
            isLoading={props.submitting}>
            Reset Password
          </Submit>
        </div>
      </div>
    </form>
  );
};

export default render;