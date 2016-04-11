import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';


function* startup() {
  console.log('startup');
};

//-----------------------------------------------------------
//----------------------- Watchers --------------------------
//-----------------------------------------------------------

export default function* root() {
  yield fork(startup);
  //yield fork();
};