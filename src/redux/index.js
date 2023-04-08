/* eslint-disable no-param-reassign */
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import authSaga from './auth/saga';
import authReducer from './auth/reducer';

import kakaoSaga from './kakao/saga';
import kakaoReducer from './kakao/reducer';

import userSaga from './user/saga';
import userRedcuer from './user/reducer';

import dateSaga from './date/saga';
import dateReducer from './date/reducer';

import daplySaga from './daply/saga';
import daplyReducer from './daply/reducer';

import homeSaga from './home/saga';
import homeReducer from './home/reducer';

import notiSaga from './notification/saga';
import notiReducer from './notification/reducer';

import { RESET_STORE } from './auth';
import searchReducer from './search/reducer';
import searchSaga from './search/saga';

const appReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
  kakao: kakaoReducer,
  user: userRedcuer,
  date: dateReducer,
  daply: daplyReducer,
  noti: notiReducer,
  search: searchReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export function* rootSaga() {
  yield all([
    homeSaga(),
    authSaga(),
    kakaoSaga(),
    userSaga(),
    dateSaga(),
    daplySaga(),
    notiSaga(),
    searchSaga(),
  ]);
}
