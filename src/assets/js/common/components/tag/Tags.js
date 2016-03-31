import React, { Component } from 'react';
import _ from 'lodash';
import Tag from './Tag';

class Tags extends Component {
  render() {
    return (
      <ul className="list-unstyled tags row">
        {this._renderTags()}
      </ul>
    );
  }

  _renderTags() {
    return _.map(this.props.tags, (tag, index) => {
      return (
        <li key={index} className="tag__item col-xs-12">
          <Tag {...tag}/>
        </li>
      );
    });
  }
};

export default Tags;