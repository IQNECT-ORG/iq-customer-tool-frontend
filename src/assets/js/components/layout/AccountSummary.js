import React, { Component } from 'react';
import { Link } from 'react-router';
import UserAvatar from '../common/UserAvatar';

class AccountSummary extends Component {
  render() {
    return (
      <div>
        <UserAvatar src="https://placeimg.com/640/480/any"/>
        <span>Bob</span>
      </div>
    );
  }
};

export default AccountSummary;