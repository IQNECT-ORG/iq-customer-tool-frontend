import React, { Component } from 'react';
import AssetField from './AssetField';
import joid from 'joid';

class AddBrandForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.onSubmit}>

        <fieldset className="form-group">
          <div className="row">
            <div className="col-xs-4 col-xs-offset-4 aspect-1-1-container">
              <div className="aspect-item">
                <AssetField
                  onChange={fields.artwork.onChange}
                  value={fields.artwork.value}/>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="form-group">
          <label
            htmlFor={joid.link(true, 'input')}
            className="sr-only">
            Website URL
          </label>
          <input
            type="text"
            className="form-control"
            id={joid.link(false, 'input')}
            placeholder="Brand Name"
            {...this.props.fields.name}/>
        </fieldset>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <button type="submit" className="btn btn-primary btn-block btn-radius-lg">Add Brand</button>
          </div>
        </div>
      </form>
    );
  }
};

export default AddBrandForm;