import { createSelector } from 'reselect';

export const authSelector = state => state.auth;
export const userId = state => authSelector(state).userId;

export const isLoggedIn = createSelector(
  userId,
  userId => {
    if(userId == null) {
      return false;
    }

    return true;
  }
)