import { call, put, all, takeLatest } from 'redux-saga/effects';
import kakaoActionTypes from '.';
import { createAPI, kakaoFetcher } from '~/hooks/requests';
import * as RootNavigation from '~/routes/navigation';

export function* searchLocSaga({ query }) {
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`;
  try {
    const { documents } = yield call(kakaoFetcher, url);
    yield put({
      type: kakaoActionTypes.GET_LOC.SUCCESS,
      locationList: documents,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: kakaoActionTypes.GET_LOC.FAIL,
    });
  }
}

export default function* kakaoSaga() {
  yield all([takeLatest(kakaoActionTypes.GET_LOC.REQUEST, searchLocSaga)]);
}
