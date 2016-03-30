import React, { Component } from 'react';
import { Link } from 'react-router';
import UserAvatar from '../common/UserAvatar';

class AccountSummary extends Component {
  render() {
    return (
      <div>
        <UserAvatar src="http://placehold.it/350x150"/>
        <span>Bob</span>
      </div>
    );
  }
};

export default AccountSummary;