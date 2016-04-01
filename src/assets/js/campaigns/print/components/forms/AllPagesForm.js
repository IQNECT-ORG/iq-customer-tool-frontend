import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import $ from 'jquery';
import ReactDOM from 'react-dom';

class AllPagesForm extends Component {
  render() {
    return (
      <div className="row">
        <form className="form--content" onSubmit={this.props.onSubmit}>
          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled">
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled">
              <div className="pane__body">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>All Pages</h2>

                    <hr/>

                    <fieldset className="form-group">
                      <label>Target Type</label>
                      <div className="row">
                        <div className="col-xs-6">
                          <button
                            type="button"
                            className="btn btn-block btn-secondary-outline btn-decision"
                            onClick={this.props.onAddWebsiteClick}>
                              Add Website
                          </button>
                        </div>

                        <div className="col-xs-6">
                          <button type="button" className="btn btn-block btn-secondary-outline btn-decision">Add Coupon</button>
                        </div>
                      </div>
                    </fieldset>

                    <hr/>

                    <fieldset className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Add Tags</label>
                      <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="#example"/>
                    </fieldset>

                    <hr/>

                    <div className="row">
                      <div className="col-xs-6">
                        <button type="button" className="btn btn-block btn-secondary">Back</button>
                      </div>

                      <div className="col-xs-6">
                        <button type="submit" className="btn btn-block btn-primary">Next</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default AllPagesForm;