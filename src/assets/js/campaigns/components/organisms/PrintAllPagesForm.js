import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import TagsInput from 'react-tagsinput';
import classNames from 'classnames';
import GalleryList from 'app/common/components/gallery/GalleryList';
import Submit from 'app/common/components/atoms/Submit';

class AllPagesForm extends Component {
  render() {
    const fields = this.props.fields.fallback;

    return (
      <form className="form--content" onSubmit={this.props.onSubmit}>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled m-b-g">
              <div className="pane__body">
                <GalleryList
                  items={this.props.images}
                  onClick={ (e, item, index) => this.props.gotoPage(index) }/>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled m-b-g">
              <div className="pane__body">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="pull-xs-right">
                      <button type="button" className="btn btn-secondary-outline" onClick={this.props.onSwitchViewClick}>
                        <i className="icons8-edit-image"/>
                      </button>
                    </div>
                    <h2 className="m-b-3">All Pages</h2>

                    <hr/>

                    {this._renderTargetType()}

                    <hr/>

                    <fieldset className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Add Tags</label>
                      <TagsInput
                        value={fields.tags.value || []}
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
                        renderLayout={(tagComponents, inputComponent) => {
                          return (
                            <span>
                              {inputComponent}
                              {tagComponents}
                            </span>
                          )
                        }}
                        onChange={this.props.onTagsChange} />
                    </fieldset>

                    <hr className="m-y-2"/>

                    <div className="row">
                      <div className="col-xs-6">
                        <button type="button" className="btn btn-block btn-secondary btn-radius-lg" onClick={this.props.onBackClick}>Back</button>
                      </div>

                      <div className="col-xs-6">
                        <Submit
                          className="btn btn-block btn-primary btn-radius-lg"
                          isLoading={this.props.submitting}>
                          Summary
                        </Submit>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  _renderTargetType() {
    if(this.props.values.fallback.url == null && this.props.values.fallback.coupon == null) {
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

    if(this.props.values.fallback.url) {
      return (
        <fieldset className="form-group">
          <label htmlFor={joid.link(true, 'input')}>Target Type</label>
          <div className="input-group">
            <input
              type="url"
              className="form-control"
              id={joid.link(false, 'input')}
              placeholder="Website"
              readOnly
              {...this.props.fields.fallback.url}
              onClick={this.props.onAddWebsiteClick}/>
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button" onClick={this.props.onWebsiteDeleteClick}>
                <i className="icons8-trash"/>
              </button>
            </span>
          </div>
        </fieldset>
      );
    }

    if(this.props.values.fallback.coupon) {
      return (
        <div>
          <span>Coupon</span>
          <button type="button" onClick={this.props.onCouponDeleteClick}>
            <i className="icons8-trash"/>
          </button>
        </div>
      );
    }

  }
};

export default AllPagesForm;