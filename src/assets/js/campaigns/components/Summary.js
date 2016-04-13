import React, { Component } from 'react';

class Summary extends Component {
  render() {
    // I am not using a table here as screw tables
    // Even for tabulated data they cause more problem than
    // they are worth
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="pane pane--filled">
            <h2>Campaign Summary</h2>

            <div>
              <div className="row">
                <div className="col-xs-2">Page</div>
                <div className="col-xs-4">Target</div>
                <div className="col-xs-6">Tags</div>
              </div>
              <ol className="list-unstyled">
                <li className="row">
                  <div className="col-xs-2">Page 2</div>
                  <div className="col-xs-4">Target</div>
                  <div className="col-xs-6">Tags</div>
                </li>
              </ol>
            </div>

            <div className="row">
              <div className="col-xs-6">
                <button type="button" className="btn btn-block btn-secondary" onClick={this.props.onBackClick}>
                  Back to Edit
                </button>
              </div>

              <div className="col-xs-6">
                <button type="submit" className="btn btn-block btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Summary;