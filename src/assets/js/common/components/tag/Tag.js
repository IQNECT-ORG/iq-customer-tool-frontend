import React, { Component } from 'react';

class Tag extends Component {
  render() {
    return (
      <div className="tag">
        <button className="tag__remove" type="button" onClick={this.props.onRemoveClick}>
          &times;
        </button>
        <div className="tag__text">
          {this.props.text}
        </div>
      </div>
    );
  }
};

export default Tag;