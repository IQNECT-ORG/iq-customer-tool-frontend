import React, { Component } from 'react';
import AssetField from '../molecules/AssetField';
import joid from 'joid';
import Submit from 'app/common/components/atoms/Submit';

class AddBrandForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.handleSubmit}>
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

        {this._renderCTAs()}

      </form>
    );
  }

  _renderCTAs() {
    if(this.props.flow === 'add') {
      return (
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <button type="submit" className="btn btn-primary btn-block btn-radius-lg">Add Brand</button>
          </div>
        </div>
      );
    } else if(this.props.flow === 'edit') {
      return (
        <div className="row">
          <div className="col-xs-6">
            <Submit
              className="btn btn-block btn-primary btn-radius-lg"
              isLoading={this.props.submitting}>
              Save
            </Submit>
          </div>
          <div className="col-xs-6">
            <button type="button" className="btn btn-secondary btn-block btn-radius-lg" onClick={this.props.onDeleteClick}>Delete</button>
          </div>
        </div>
      );
    }
  }
};

export default AddBrandForm;