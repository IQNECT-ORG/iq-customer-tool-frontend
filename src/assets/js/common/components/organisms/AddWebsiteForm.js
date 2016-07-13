import React, { Component } from 'react';
import joid from 'joid';
import Submit from 'app/common/components/forms/Submit';

class AddWebsiteForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor={joid.link(true, 'input')} className="sr-only">Website URL</label>
          <input
            type="url"
            className="form-control"
            id={joid.link(false, 'input')}
            placeholder="http://www.example.com/"
            {...this.props.fields.website}/>
        </fieldset>

        <div className="row">
          <div className="col-xs-6">
            <button type="button" className="btn btn-block btn-secondary btn-radius-lg">Preview</button>
          </div>

          <div className="col-xs-6">
            <Submit
              className="btn btn-block btn-primary btn-radius-lg"
              isLoading={this.props.submitting}>
              Save
            </Submit>
          </div>
        </div>
      </form>
    );
  }
};

export default AddWebsiteForm;