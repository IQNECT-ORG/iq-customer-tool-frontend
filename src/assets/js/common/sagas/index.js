import { fork } from 'redux-saga/effects';
import brandForm from './brandForm';
import couponForm from './couponForm';

export default function* root() {
  yield fork(brandForm);
  yield fork(couponForm);
};