import { call, put, all, takeLatest, select } from 'redux-saga/effects';

import _ from 'lodash';
import { fromJS } from 'immutable';
import notiActionTypes from '.';
import { createAPI, fetcher, updater } from '~/hooks/requests';
import * as RootNavigation from '~/routes/navigation';

export function* getNotiListSaga() {
  const url = createAPI('/notification');
  try {
    const { notiList } = yield call(fetcher, url);
    const filterUnRead = notiList.filter(
      (x) => x.receiverRead === 0 || x.receiverRead === false,
    );
    const mainBellActive = filterUnRead.length > 0;
    yield put({
      type: notiActionTypes.GET_NOTI_LIST.SUCCESS,
      notiList,
      mainBellActive,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: notiActionTypes.GET_NOTI_LIST.FAIL,
    });
  }
}

export function* readNotiSaga({ notiId }) {
  const url = createAPI(`/notification/${notiId}`);
  try {
    yield call(updater, { url });
    yield put({
      type: notiActionTypes.READ_NOTI.SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: notiActionTypes.READ_NOTI.FAIL,
    });
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(notiActionTypes.GET_NOTI_LIST.REQUEST, getNotiListSaga),
    takeLatest(notiActionTypes.READ_NOTI.REQUEST, readNotiSaga),
  ]);
}
