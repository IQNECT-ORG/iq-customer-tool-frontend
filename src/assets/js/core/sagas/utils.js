import { take } from 'redux-saga/effects';

export const takeN = function*(n, type) {
  for(let i = 0; i < n; i++) {
    yield take(type);
  }
};