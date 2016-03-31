import React, { Component } from 'react';
import _ from 'lodash';
import joid from 'joid';

class CreateMagazineCampaignForm extends Component {
  render() {


    return (
      <div className="row">
        <form className="form--content">
          <div className="col-xs-12 col-sm-6">
            <div className="pane">

            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="pane pane--filled">
              <div className="pane__body">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>Basic Details</h2>

                    <fieldset className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Campaign Title</label>
                      <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="Demo Name"/>
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Magazine Language</label>
                      <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="English"/>
                    </fieldset>

                    <div className="row">
                      <div className="col-xs-12">
                        <label htmlFor={joid.link(true, 'input')}>Campaign Period</label>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <fieldset className="form-group">
                          <div className="input-group">
                            <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="From"/>
                            <div className="input-group-addon">i</div>
                          </div>
                        </fieldset>
                      </div>
                      <div className="col-xs-12 col-sm-6">
                        <fieldset className="form-group">
                          <label className="sr-only" htmlFor={joid.link(true, 'input')}>From</label>
                          <div className="input-group">
                            <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="To"/>
                            <div className="input-group-addon">i</div>
                          </div>
                        </fieldset>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor={joid.link(true, 'input')}>Default Target</label>
                      <div className="row">
                        <div className="col-xs-8 col-md-9 col-lg-10">
                          <input type="text" className="form-control" id={joid.link(false, 'input')} placeholder="Amount"/>
                        </div>
                        <div className="col-xs-4 col-md-3 col-lg-2">
                          <button type="button" className="btn btn-block btn-secondary-outline">i</button>
                        </div>
                      </div>
                    </div>

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

export default CreateMagazineCampaignForm;