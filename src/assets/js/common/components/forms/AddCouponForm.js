import React, { Component } from 'react';

class AddCouponForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <div className="col-xs-6">
            <button type="button" className="btn btn-block btn-secondary">Browse</button>
          </div>

          <div className="col-xs-6">
            <button type="submit" className="btn btn-block btn-primary">Create New</button>
          </div>
        </div>
      </form>
    );
  }
};

export default AddCouponForm;