import { createSelector } from 'reselect';

const authSelector = state => state.auth;
const userId = state => authSelector(state).userId;

export const isLoggedIn = createSelector(
  userId,
  userId => {
    if(userId == null) {
      return false;
    }

    return true;
  }
)