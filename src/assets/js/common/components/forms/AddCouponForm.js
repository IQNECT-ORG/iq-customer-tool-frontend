import React, { Component } from 'react';

class AddCouponForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <fieldset className="form-group">
          <label htmlFor="exampleInputEmail1" className="sr-only">Email address</label>
          <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
        </fieldset>

        <button type="submit" className="btn btn-primary">Add Brand</button>
      </form>
    );
  }
};

export default AddCouponForm;