import React from 'react';
import Submit from 'app/common/components/forms/Submit';

const ResetPasswordForm = (props) => {
  const fields = props.fields;
  return (
    <form className="form--content" onSubmit={props.onSubmit}>
      <fieldset className="form-group">
        <label htmlFor="token">Code</label>
        <input
          type="text"
          className="form-control"
          id="token"
          placeholder="Token"
          {...fields.token}/>
      </fieldset>
      <fieldset className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Another input"
          {...fields.password}/>
      </fieldset>
      <fieldset className="form-group">
        <label htmlFor="passwordMatch">Password Match</label>
        <input
          type="password"
          className="form-control"
          id="passwordMatch"
          placeholder="Another input"
          {...fields.passwordMatch}/>
      </fieldset>

      <div className="row">
        <div className="col-xs-12">
          <Submit
            className="btn btn-block btn-primary"
            isLoading={props.submitting}>
            Reset My Password
          </Submit>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;