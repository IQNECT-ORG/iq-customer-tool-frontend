import React, { Component } from 'react';

class FilterForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label className="sr-only" htmlFor="filterInput">Filter</label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="icons8-dashboard"/>
            </span>
            <input
              className="form-control"
              id="filterInput"
              placeholder={this.props.placeholder}
              {...fields.filter}/>
          </div>
        </fieldset>

        <button type="submit" hidden>Filter</button>
      </form>
    );
  }
};

export default FilterForm;