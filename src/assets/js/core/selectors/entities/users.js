import { createSelector } from 'reselect';
import { userId } from '../auth';
import _ from 'lodash';

export const getUsers = state => state.entities.users;

export const getLoggedInUser = createSelector(
  userId,
  getUsers,
  (userId, users) => {
    return _.find(users, x => x.userId === userId);
  }
)