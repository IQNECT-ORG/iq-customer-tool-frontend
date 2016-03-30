import React, { Component } from 'react';

class Avatar extends Component {
  render() {
    return (
      <div className="avatar">
        <div className="avatar__image-container">
          <img src={this.props.src}/>
        </div>
      </div>
    );
  }
};

export default Avatar;