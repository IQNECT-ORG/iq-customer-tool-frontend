import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';
import TagsInput from 'react-tagsinput';
import classNames from 'classnames';

class AllPagesForm extends Component {
  render() {
    const fields = this.props.fields.fallback;

    const images = _.map(this.props.images, (image, index) => {
      return (
        <li className="col-xs-4" key={index}>
          <button type="button" onClick={ _ => this.props.updatePage(index) }>
            <img className="img-fluid" src={image}/>
          </button>
        </li>
      );
    });

    return (
      <div className="row">
        <form className="form--content" onSubmit={this.props.onSubmit}>
          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled">
              <ul className="row list-unstyled">
                {images}
              </ul>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled">
              <div className="pane__body">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>All Pages</h2>

                    <button type="button" className="btn btn-secondary-outline" onClick={this.props.onSwitchViewClick}>
                      <i className="icons8-edit-image"/>
                    </button>

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

                    <hr/>

                    <div className="row">
                      <div className="col-xs-6">
                        <button type="button" className="btn btn-block btn-secondary" onClick={this.props.onBackClick}>Back</button>
                      </div>

                      <div className="col-xs-6">
                        <button type="submit" className="btn btn-block btn-primary">Summary</button>
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
    if(this.props.values.fallback.website == null && this.props.values.fallback.coupon == null) {
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

    if(this.props.values.fallback.website) {
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
              {...this.props.fields.fallback.website}
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