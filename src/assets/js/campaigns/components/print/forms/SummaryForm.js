import React, { Component } from 'react';
import _ from 'lodash';
import Submit from 'app/common/components/forms/Submit';

class SummaryForm extends Component {
  render() {
    // I am not using a table here as screw tables
    // Even for tabulated data they cause more problem than
    // they are worth

    const rows = _.map(this.props.pages, page => {
      return (
        <li className="row" key={page.index}>
          <div className="col-xs-2">Page {page.index + 1}</div>
          <div className="col-xs-4">{page.url}</div>
          <div className="col-xs-6">{page.coupon}</div>
          <div className="col-xs-6">
            <button type="button" onClick={ _ => this.props.gotoPage(page.index) }>
              Edit
            </button>
          </div>
        </li>
      );
    });


    return (
      <form className="form--content" onSubmit={this.props.onSubmit}>
        <div className="row">
          <div className="col-xs-12">
            <div className="pane pane--filled m-b-g">
              <h2>Campaign Summary</h2>

              <div>
                <div className="row">
                  <div className="col-xs-2">Page</div>
                  <div className="col-xs-4">Target</div>
                  <div className="col-xs-6">Coupon</div>
                </div>
                <ol className="list-unstyled">
                  {rows}
                </ol>
              </div>

              <div className="row">
                <div className="col-xs-6">
                  <button type="button" className="btn btn-block btn-secondary btn-radius-lg" onClick={this.props.onBackClick}>
                    Back to Edit
                  </button>
                </div>

                <div className="col-xs-6">
                  <Submit
                    className="btn btn-block btn-primary btn-radius-lg"
                    isLoading={this.props.submitting}>
                    Save
                  </Submit>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
};

export default SummaryForm;