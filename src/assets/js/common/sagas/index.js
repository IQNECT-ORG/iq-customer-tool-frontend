import { fork } from 'redux-saga/effects';
import brandForm from './brandForm';
import couponForm from './couponForm';
import auth from './auth';
import addWebsiteForm from './addWebsiteForm';

export default function* root() {
  yield [
    brandForm(),
    couponForm(),
    auth(),
    addWebsiteForm()
  ];
};