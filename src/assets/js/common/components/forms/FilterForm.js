import React, { Component } from 'react';

class FilterForm extends Component {
  render() {
    const fields = this.props.fields;
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label className="sr-only" htmlFor="filterInput">Filter</label>
          <input
            className="form-control"
            id="filterInput"
            placeholder={this.props.placeholder}
            {...fields.filter}/>
        </fieldset>

        <button type="submit" hidden>Filter</button>
      </form>
    );
  }
};

export default FilterForm;