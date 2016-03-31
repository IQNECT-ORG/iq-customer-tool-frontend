import React, { Component } from 'react';

class UserAvatar extends Component {
  render() {
    return (
      <div className="user-avatar">
        <div className="user-avatar__image-container">
          <img src={this.props.src}/>
        </div>
      </div>
    );
  }
};

export default UserAvatar;