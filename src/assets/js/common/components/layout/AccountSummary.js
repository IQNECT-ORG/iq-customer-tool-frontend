import React, { Component } from 'react';
import { Link } from 'react-router';
import UserAvatar from '../UserAvatar';

class AccountSummary extends Component {
  render() {
    return (
      <div className="account-summary">
        <UserAvatar src="http://www.thetimes.co.uk/tto/multimedia/archive/00968/ad0f2a3e-50df-11e5-_968539c.jpg"/>
        <span className="user-name">Bob</span>
      </div>
    );
  }
};

export default AccountSummary;