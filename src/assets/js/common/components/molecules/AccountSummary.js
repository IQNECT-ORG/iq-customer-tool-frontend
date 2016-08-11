import React from 'react';
import UserAvatar from './UserAvatar';
import _ from 'lodash';

export default props => {
  return (
    <div className="account-summary">
      <UserAvatar src="/assets/images/user-fallback.svg"/>
      <span className="user-name">
        {_.get(props, 'user.firstName')} {_.get(props, 'user.lastName')}
      </span>
    </div>
  );
}