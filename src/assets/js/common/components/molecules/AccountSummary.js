import React from 'react';
import UserAvatar from './UserAvatar';

export default (props) => {
  return (
    <div className="account-summary">
      <UserAvatar src="/assets/images/user-fallback.svg"/>
      <span className="user-name">
        {props.user.firstName} {props.user.lastName}
      </span>
    </div>
  );
}