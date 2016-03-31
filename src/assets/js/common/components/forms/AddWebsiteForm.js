import React, { Component } from 'react';
import joid from 'joid';

class AddWebsiteForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor={joid.link(true, 'input')} className="sr-only">Website URL</label>
          <input type="url" className="form-control" id={joid.link(false, 'input')} placeholder="http://www.example.com/"/>
        </fieldset>

        <div className="row">
          <div className="col-xs-6">
            <button type="button" className="btn btn-block btn-secondary">Preview</button>
          </div>

          <div className="col-xs-6">
            <button type="submit" className="btn btn-block btn-primary">Save</button>
          </div>
        </div>
      </form>
    );
  }
};

export default AddWebsiteForm;