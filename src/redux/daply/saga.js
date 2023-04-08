import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import daplyActionTypes, { daplyActions } from '.';
import { createAPI, fetcher, poster, updater, deleter } from '~/hooks/requests';

import { navigate } from '~/routes/navigation';
import * as RootNavigation from '~/routes/navigation';
import authActionTypes, { authActions } from '../auth';

export function* getMyDaplyListSaga() {
  const url = createAPI(`/daply/myDaply`);
  try {
    const { myDaplyList } = yield call(fetcher, url);
    yield put({
      type: daplyActionTypes.GET_MY_DAPLY_LIST.SUCCESS,
      myDaplyList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.GET_MY_DAPLY_LIST.FAIL,
    });
  }
}

export function* getDaplyListByCategorySaga({ category }) {
  const url = createAPI(`/daply/category?value=${category}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: daplyActionTypes.GET_DAPLY_LIST_BY_CATEGORY.SUCCESS,
      result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.GET_DAPLY_LIST_BY_CATEGORY.FAIL,
    });
  }
}

export function* refreshMyDaplyListSaga() {
  const url = createAPI(`/daply/myDaply`);
  try {
    const { myDaplyList } = yield call(fetcher, url);
    yield put({
      type: daplyActionTypes.REFRESH_MY_DAPLY_LIST.SUCCESS,
      myDaplyList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.REFRESH_MY_DAPLY_LIST.FAIL,
    });
  }
}

export function* getDaplyListSaga({ userId }) {
  const url = createAPI(`/daply?userId=${userId}`);
  try {
    const { daplyList } = yield call(fetcher, url);
    yield put({
      type: daplyActionTypes.GET_DAPLY_LIST.SUCCESS,
      daplyList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.GET_DAPLY_LIST.FAIL,
    });
  }
}

export function* getDaplyLikeListSaga({ daplyId }) {
  const url = createAPI(`/daply/like/${daplyId}`);
  try {
    const { daplyLikeList } = yield call(fetcher, url);
    yield put({
      type: daplyActionTypes.GET_DAPLY_LIKE_LIST.SUCCESS,
      daplyLikeList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.GET_DAPLY_LIKE_LIST.FAIL,
    });
  }
}

export function* refreshDaplyListSaga({ userId }) {
  const url = createAPI(`/daply?userId=${userId}`);
  try {
    const { daplyList } = yield call(fetcher, url);
    yield put({
      type: daplyActionTypes.REFRESH_DAPLY_LIST.SUCCESS,
      daplyList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.REFRESH_DAPLY_LIST.FAIL,
    });
  }
}

export function* getDaplySaga({ daplyId }) {
  const url = createAPI(`/daply/${daplyId}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: daplyActionTypes.GET_DAPLY.SUCCESS,
      daplyDetail: result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.GET_DAPLY.FAIL,
    });
  }
}

export function* getDaplyCommentSaga({ daplyId }) {
  const url = createAPI(`/daply/comment/${daplyId}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: daplyActionTypes.GET_DAPLY_COMMENT.SUCCESS,
      commentList: result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.GET_DAPLY_COMMENT.FAIL,
    });
  }
}

export function* postDaplySaga({ categoryList }) {
  const url = createAPI(`/daply`);
  const daplyState = yield select((state) => state.daply);
  const { postingDaply, postingPlayList } = daplyState;
  try {
    const emptyDateRemoved = postingPlayList.filter((x) => x.date);
    const orderInserted = emptyDateRemoved.map((x, i) => ({
      ...x.date,
      order: i + 1,
    }));

    const payload = {
      ...postingDaply,
      dateList: orderInserted,
      categoryList,
    };

    const { daplyId } = yield call(poster, { url, body: payload });

    yield RootNavigation.replace('PostDaplyConfirm', {
      daplyId,
      from: 'DaplyPost',
    });

    yield put({
      type: daplyActionTypes.POST_DAPLY.SUCCESS,
    });

    yield put({ type: daplyActionTypes.GET_MY_DAPLY_LIST.REQUEST });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.POST_DAPLY.FAIL,
    });
  }
}

export function* postDaplyLikeSaga({ daplyId }) {
  const url = createAPI(`/daply/like`);
  try {
    yield call(poster, { url, body: { datePlayListId: daplyId } });
    yield put({
      type: daplyActionTypes.POST_DAPLY_LIKE.SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.POST_DAPLY_LIKE.FAIL,
    });
  }
}

export function* postDaplyCommentSaga({ daplyId, content }) {
  const { user } = yield select((state) => state.auth);
  const url = createAPI(`/daply/comment`);
  try {
    const { commentId } = yield call(poster, {
      url,
      body: { daplyId, content },
    });
    yield put({
      type: daplyActionTypes.POST_DAPLY_COMMENT.SUCCESS,
      comment: {
        id: commentId,
        user,
        content,
        createdAt: new Date(),
        updateddAt: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.POST_DAPLY_COMMENT.FAIL,
    });
  }
}

export function* deleteDaplyCommentSaga({ commentId }) {
  const url = createAPI(`/daply/comment/${commentId}`);
  const {
    daply: { daplyComment },
    commentList,
  } = yield select((state) => state.daply);
  const daplyCommentIndex = daplyComment.findIndex((x) => x.id === commentId);
  const nextDaplyComment = fromJS(daplyComment).toJS();
  const nextCommentList = fromJS(commentList).toJS();
  if (daplyCommentIndex !== -1) {
    nextDaplyComment.splice(daplyCommentIndex, 1);
  }
  const commentIndex = commentList.findIndex((x) => x.id === commentId);
  nextCommentList.splice(commentIndex, 1);

  try {
    yield call(deleter, { url });
    yield put({
      type: daplyActionTypes.DELETE_DAPLY_COMMENT.SUCCESS,
      daplyComment: nextDaplyComment,
      commentList: nextCommentList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.DELETE_DAPLY_COMMENT.FAIL,
    });
  }
}

export function* deleteDaplyLikeSaga({ daplyId }) {
  const url = createAPI(`/daply/like/${daplyId}`);
  try {
    yield call(deleter, { url });
    yield put({
      type: daplyActionTypes.DELETE_DAPLY_LIKE.SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.DELETE_DAPLY_LIKE.FAIL,
    });
  }
}

export function* deleteDaplySaga({ daplyId }) {
  const url = createAPI(`/daply/${daplyId}`);
  try {
    yield call(deleter, { url });
    yield put({
      type: daplyActionTypes.DELETE_DAPLY.SUCCESS,
    });
    yield RootNavigation.pop();
    yield put({ type: daplyActionTypes.GET_MY_DAPLY_LIST.REQUEST });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.DELETE_DAPLY.FAIL,
    });
  }
}

export function* postDaplyFavoriteSaga({ daplyId }) {
  const url = createAPI(`/daply/favorite`);
  const payload = {
    datePlayListId: daplyId,
  };
  try {
    yield call(poster, { url, body: payload });
    yield put({
      type: daplyActionTypes.POST_DAPLY_FAVORITE.SUCCESS,
    });
    yield put({ type: authActionTypes.GET_FAVORITE.REQUEST });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.POST_DAPLY_FAVORITE.FAIL,
    });
  }
}

export function* deleteDaplyFavoriteSaga({ daplyId }) {
  const url = createAPI(`/daply/favorite/${daplyId}`);
  try {
    yield call(deleter, { url });
    yield put({
      type: daplyActionTypes.DELETE_DAPLY_FAVORITE.SUCCESS,
    });
    yield put({ type: authActionTypes.GET_FAVORITE.REQUEST });
  } catch (error) {
    console.log(error);
    yield put({
      type: daplyActionTypes.DELETE_DAPLY_FAVORITE.FAIL,
    });
  }
}

export default function* daplySaga() {
  yield all([
    takeLatest(daplyActionTypes.GET_MY_DAPLY_LIST.REQUEST, getMyDaplyListSaga),
    takeLatest(
      daplyActionTypes.REFRESH_MY_DAPLY_LIST.REQUEST,
      refreshMyDaplyListSaga,
    ),
    takeLatest(daplyActionTypes.GET_DAPLY_LIST.REQUEST, getDaplyListSaga),
    takeLatest(
      daplyActionTypes.REFRESH_DAPLY_LIST.REQUEST,
      refreshDaplyListSaga,
    ),
    takeLatest(daplyActionTypes.GET_DAPLY.REQUEST, getDaplySaga),
    takeLatest(
      daplyActionTypes.GET_DAPLY_LIKE_LIST.REQUEST,
      getDaplyLikeListSaga,
    ),
    takeLatest(daplyActionTypes.GET_DAPLY_COMMENT.REQUEST, getDaplyCommentSaga),
    takeLatest(daplyActionTypes.POST_DAPLY.REQUEST, postDaplySaga),
    takeLatest(daplyActionTypes.DELETE_DAPLY.REQUEST, deleteDaplySaga),
    takeLatest(daplyActionTypes.POST_DAPLY_LIKE.REQUEST, postDaplyLikeSaga),
    takeLatest(daplyActionTypes.DELETE_DAPLY_LIKE.REQUEST, deleteDaplyLikeSaga),
    takeLatest(
      daplyActionTypes.POST_DAPLY_COMMENT.REQUEST,
      postDaplyCommentSaga,
    ),
    takeLatest(
      daplyActionTypes.DELETE_DAPLY_COMMENT.REQUEST,
      deleteDaplyCommentSaga,
    ),
    takeLatest(
      daplyActionTypes.GET_DAPLY_LIST_BY_CATEGORY.REQUEST,
      getDaplyListByCategorySaga,
    ),
    takeLatest(
      daplyActionTypes.POST_DAPLY_FAVORITE.REQUEST,
      postDaplyFavoriteSaga,
    ),
    takeLatest(
      daplyActionTypes.DELETE_DAPLY_FAVORITE.REQUEST,
      deleteDaplyFavoriteSaga,
    ),
  ]);
}
