import React, { Component } from 'react';
import AssetField from './AssetField';
import joid from 'joid';

class AddBrandForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <AssetField
            onChange={fields.artwork.onChange}
            value={fields.artwork.value}/>
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
        <button type="submit" className="btn btn-primary">Add Brand</button>
      </form>
    );
  }
};

export default AddBrandForm;