import { fork } from 'redux-saga/effects';
import brandForm from './brandForm';
import couponForm from './couponForm';
import browseCoupons from './browseCoupons';

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

export default function* root() {
  yield fork(brandForm);
  yield fork(couponForm);
  yield fork(browseCoupons);
};