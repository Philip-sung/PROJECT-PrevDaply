import { call, put, all, takeLatest } from 'redux-saga/effects';
import { createAPI, fetcher } from '~/hooks/requests';
import homeActionTypes from '.';

export function* getDateTopSaga() {
  const url = createAPI('/home/date-top');
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: homeActionTypes.GET_DATE_TOP.SUCCESS,
      result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: homeActionTypes.GET_DATE_TOP.FAIL,
    });
  }
}

export function* getDaplyTopSaga() {
  const url = createAPI('/home/daply-top');
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: homeActionTypes.GET_DAPLY_TOP.SUCCESS,
      result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: homeActionTypes.GET_DAPLY_TOP.FAIL,
    });
  }
}

export function* getFeedSaga() {
  const url = createAPI('/feed');
  try {
    const { feedList } = yield call(fetcher, url);
    yield put({
      type: homeActionTypes.GET_FEED.SUCCESS,
      feedList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: homeActionTypes.GET_FEED.FAIL,
    });
  }
}

export function* getDateTopThemeSaga({ isAll }) {
  const url = createAPI(`/home/date/theme?isAll=${isAll.toString()}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: homeActionTypes.GET_DATE_TOP_THEME.SUCCESS,
      result,
    });
    const [initialSubGroup] = result;
    yield put({
      type: homeActionTypes.SET_DATE_THEME,
      subGroupId: initialSubGroup.id,
    });
    yield put({
      type: homeActionTypes.GET_DATE_BY_THEME.REQUEST,
      subGroupId: initialSubGroup.id,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: homeActionTypes.GET_DATE_TOP_THEME.FAIL,
    });
  }
}

export function* getDateByThemeSaga({ subGroupId }) {
  const url = createAPI(`/home/date/theme/${subGroupId}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: homeActionTypes.GET_DATE_BY_THEME.SUCCESS,
      result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: homeActionTypes.GET_DATE_BY_THEME.FAIL,
    });
  }
}

export function* getDateByFeelingSaga({ feeling }) {
  const url = createAPI(`/home/date/feeling/${feeling}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: homeActionTypes.GET_DATE_BY_FEELING.SUCCESS,
      result,
    });
  } catch (error) {
    console.log(error.response.message);
    yield put({
      type: homeActionTypes.GET_DATE_BY_FEELING.FAIL,
    });
  }
}

export function* getDaplyFeedSaga() {
  const url = createAPI(`/feed/daply`);
  try {
    const { daplyFeedList } = yield call(fetcher, url);
    yield put({
      type: homeActionTypes.GET_DAPLY_FEED.SUCCESS,
      daplyFeedList,
    });
  } catch (error) {
    console.log(error.response.message);
    yield put({
      type: homeActionTypes.GET_DAPLY_FEED.FAIL,
    });
  }
}

export default function* homeSaga() {
  yield all([
    takeLatest(homeActionTypes.GET_DATE_TOP.REQUEST, getDateTopSaga),
    takeLatest(homeActionTypes.GET_DAPLY_TOP.REQUEST, getDaplyTopSaga),
    takeLatest(homeActionTypes.GET_FEED.REQUEST, getFeedSaga),
    takeLatest(homeActionTypes.GET_DATE_TOP_THEME.REQUEST, getDateTopThemeSaga),
    takeLatest(homeActionTypes.GET_DATE_BY_THEME.REQUEST, getDateByThemeSaga),
    takeLatest(
      homeActionTypes.GET_DATE_BY_FEELING.REQUEST,
      getDateByFeelingSaga,
    ),
    takeLatest(homeActionTypes.GET_DAPLY_FEED.REQUEST, getDaplyFeedSaga),
  ]);
}
