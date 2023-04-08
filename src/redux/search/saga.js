import { call, put, all, takeLatest } from 'redux-saga/effects';
import { createAPI, fetcher } from '~/hooks/requests';
import searchActionTypes from '.';

export function* getCollectionSaga({ word }) {
  const url = createAPI(`/search/words?q=${word}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: searchActionTypes.GET_COLLECTION.SUCCESS,
      result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: searchActionTypes.GET_COLLECTION.FAIL,
    });
  }
}

export function* getSearchSaga({ query }) {
  const url = createAPI(`/search?q=${query}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: searchActionTypes.GET_SEARCH.SUCCESS,
      result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: searchActionTypes.GET_SEARCH.FAIL,
    });
  }
}

export default function* searchSaga() {
  yield all([
    takeLatest(searchActionTypes.GET_COLLECTION.REQUEST, getCollectionSaga),
    takeLatest(searchActionTypes.GET_SEARCH.REQUEST, getSearchSaga),
  ]);
}
