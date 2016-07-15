import React, { Component } from 'react';
import _ from 'lodash';
import Titlebar from '../Titlebar';
import Avatar from '../../Avatar';

class TitlebarFactory extends Component {
  static defaultProps = {
    title: '',
    avatars: [],
    ctas: [],
    steptracker: null
  }

  render() {
    return (
      <Titlebar className="container-fluid">
        <div className="row">
          <div className="col-xs-6">
            {this._renderAvatars()}
            <div>
              {this._renderTitle()}
              {this._renderSteptracker()}
            </div>
          </div>
          <div className="col-xs-6">
            {this._renderCTAS()}
          </div>
        </div>
      </Titlebar>
    );
  }

  _renderTitle() {
    const { title } = this.props;

    if(_.isString(title)) {
      return (
        <h1>{title}</h1>
      );
    } else {
      // Should be a react component
      return title;
    }
  }

  _renderCTAS() {
    return _.map(this.props.ctas, (cta, index) => {
      return (
        <div className="flex-pull-right" key={index}>
          {cta}
        </div>
      );
    });
  }

  _renderAvatars() {
    return _.map(this.props.avatars, (avatar, index) => {
      return (
        <Avatar
          key={index}
          className="pull-xs-left m-r-1"
          {...avatar}/>
      );
    });
  }

  _renderSteptracker() {
    return this.props.steptracker;
  }
};

export default TitlebarFactory;