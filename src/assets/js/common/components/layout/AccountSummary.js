import React from 'react';
import UserAvatar from '../UserAvatar';

export default (props) => {
  return (
    <div className="account-summary">
      <UserAvatar src="http://www.thetimes.co.uk/tto/multimedia/archive/00968/ad0f2a3e-50df-11e5-_968539c.jpg"/>
      <span className="user-name">
        {props.user.firstName} {props.user.lastName}
      </span>
    </div>
  );
}