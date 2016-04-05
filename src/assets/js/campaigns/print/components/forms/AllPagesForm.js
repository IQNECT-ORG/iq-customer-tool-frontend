import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import TagsInput from 'react-tagsinput';
import classNames from 'classnames';

class AllPagesForm extends Component {
  render() {
    return (
      <div className="row">
        <form className="form--content" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
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

                    {this._renderTargetType()}
                    <hr/>

                    <fieldset className="form-group">
                      <select multiple hidden>
                        <option>Hello</option>
                        <option>World!</option>
                      </select>
                      <label htmlFor={joid.link(true, 'input')}>Add Tags</label>
                      <TagsInput
                        value={[]}
                        renderInput={(props) => {
                          const {onChange, value, className, ...other} = props;
                          return (
                            <input
                              type="text"
                              id={joid.link(false, 'input')}
                              className={classNames(className, 'form-control')}
                              placeholder="#example"
                              onChange={onChange}
                              value={value}
                              {...other}/>
                          );
                        }}
                        onChange={(tags) => {
                          console.log(tags);
                        }} />
                    </fieldset>

                    <hr/>

                    <div className="row">
                      <div className="col-xs-6">
                        <button type="button" className="btn btn-block btn-secondary" onClick={this.props.onBackClick}>Back</button>
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

  _renderTargetType() {
    if(this.props.values.website == null) {
      return (
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
              <button
                type="button"
                className="btn btn-block btn-secondary-outline btn-decision"
                onClick={this.props.onAddCouponClick}>
                Add Coupon
              </button>
            </div>
          </div>
        </fieldset>
      );
    }

    return (
      <fieldset className="form-group">
        <label htmlFor={joid.link(true, 'input')}>Target Type</label>
        <div className="input-group">
          <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="Website" {...this.props.fields.website}/>
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button" onClick={this.props.onWebsiteDeleteClick}>
              <i className="icons8-trash"/>
            </button>
          </span>
        </div>
      </fieldset>
    );
  }
};

export default AllPagesForm;