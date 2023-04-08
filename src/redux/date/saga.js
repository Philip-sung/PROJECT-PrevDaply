import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { fromJS } from 'immutable';
import Toast from 'react-native-toast-message';
import { createAPI, fetcher, poster, updater, deleter } from '~/hooks/requests';
import { navigate } from '~/routes/navigation';
import * as RootNavigation from '~/routes/navigation';
import { parseCategory, parseSubCategory } from './utils';
import dateActionTypes from '.';
import homeActionTypes from '../home';
import { findTargetFeelingObj } from '../../utils';
import { uploadFeatureImage, uploadToS3 } from '../../utils/image';

export function* getMyDateListSaga() {
  const url = createAPI(`/date/myDate`);
  try {
    const { myDateList } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.GET_MY_DATE_LIST.SUCCESS,
      myDateList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_MY_DATE_LIST.FAIL,
    });
  }
}

export function* refreshMyDateListSaga() {
  const url = createAPI(`/date/myDate`);
  try {
    const { myDateList } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.REFRESH_MY_DATE_LIST.SUCCESS,
      myDateList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.REFRESH_MY_DATE_LIST.FAIL,
    });
  }
}

export function* getDateListSaga({ userId }) {
  const url = createAPI(`/date?userId=${userId}`);
  try {
    const { dateList } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.GET_DATE_LIST.SUCCESS,
      dateList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_DATE_LIST.FAIL,
    });
  }
}

export function* getDateLikeListSaga({ dateId }) {
  const url = createAPI(`/date/like/${dateId}`);
  try {
    const { dateLikeList } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.GET_DATE_LIKE_LIST.SUCCESS,
      dateLikeList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_DATE_LIKE_LIST.FAIL,
    });
  }
}

export function* refreshDateListSaga({ userId }) {
  const url = createAPI(`/date?userId=${userId}`);
  try {
    const { dateList } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.REFRESH_DATE_LIST.SUCCESS,
      dateList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.REFRESH_DATE_LIST.FAIL,
    });
  }
}

export function* getGroupListSaga() {
  const url = createAPI(`/date/group`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.GET_GROUP_LIST.SUCCESS,
      groupList: result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_GROUP_LIST.FAIL,
    });
  }
}

export function* getSubGroupListSaga({ location }) {
  const dateState = yield select((state) => state.date);
  const { groupList, postingDate } = dateState;

  // 세부 분류 가져오기
  const targetGroup = parseCategory({ location, groupList });
  const url = createAPI(`/date/subGroup?groupId=${targetGroup.id}`);
  try {
    const { result } = yield call(fetcher, url);
    // 타겟 세부 분류 찾기
    const targetSubGroup = parseSubCategory({ location, subGroupList: result });

    yield put({
      type: dateActionTypes.GET_SUB_GROUP_LIST.SUCCESS,
      subGroupList: result,
    });

    // 질문 가져오기
    yield put({
      type: dateActionTypes.GET_DATE_FEATURE_LIST.REQUEST,
      dateSubGroupId: targetSubGroup.id,
    });

    // 포스팅 데이트 업데이트
    yield put({
      type: dateActionTypes.SET_POSTING_DATE,
      postingDate: { ...postingDate, subGroup: targetSubGroup },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_SUB_GROUP_LIST.FAIL,
    });
  }
}

export function* getDateFeatureListSaga({ dateSubGroupId }) {
  const url = createAPI(`/date/feature?dateSubGroupId=${dateSubGroupId}`);
  try {
    const { result } = yield call(fetcher, url);
    // 유저가 입력할 사진과 내용
    const insertedData = result.map((x) => ({
      ...x,
      imageList: [],
      content: '',
    }));
    yield put({
      type: dateActionTypes.GET_DATE_FEATURE_LIST.SUCCESS,
      featureList: insertedData,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_DATE_FEATURE_LIST.FAIL,
    });
  }
}

export function* getDateSaga({ dateId }) {
  const url = createAPI(`/date/${dateId}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.GET_DATE.SUCCESS,
      date: result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_DATE.FAIL,
    });
  }
}

export function* getDateCommentSaga({ dateId }) {
  const url = createAPI(`/date/comment/${dateId}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.GET_DATE_COMMENT.SUCCESS,
      commentList: result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_DATE_COMMENT.FAIL,
    });
  }
}

export function* updateReviewSaga({ reviewId, content, imageList }) {
  const {
    date: { id },
  } = yield select((state) => state.date);
  const url = createAPI(`/date/review/${reviewId}`);
  try {
    const imageInserted = yield uploadToS3(id, imageList);
    yield call(updater, {
      url,
      body: { content, imageList: imageInserted },
    });
    yield put({
      type: dateActionTypes.UPDATE_REVIEW.SUCCESS,
    });
    yield RootNavigation.pop();
    yield put({ type: dateActionTypes.GET_DATE.REQUEST, dateId: id });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.UPDATE_REVIEW.FAIL,
    });
  }
}

export function* postDateSaga() {
  const url = createAPI(`/date`);
  const dateState = yield select((state) => state.date);
  const authState = yield select((state) => state.auth);
  const { postingDate, featureList } = dateState;
  const {
    user: { id },
  } = authState;
  try {
    const { location } = postingDate;

    const kakaoLoc = {
      kakaoId: location.id,
      addressName: location.address_name,
      roadAddressName: location.road_address_name,
      category: location.category_name
        .split('>')
        .map((item) => item.trim())
        .toString(),
      x: location.x,
      y: location.y,
      phone: location.phone,
      placeName: location.place_name,
      placeUrl: location.place_url,
    };

    const mainImgUrl = yield uploadToS3(id, [postingDate.mainImg]);
    const imageInsertedFeature = yield uploadFeatureImage(id, featureList);

    const payload = {
      ...postingDate,
      mainImg: mainImgUrl[0],
      location: kakaoLoc,
      featureList: imageInsertedFeature,
    };

    const { dateId } = yield call(poster, { url, body: payload });
    yield RootNavigation.replace('PostDetailConfirm', { dateId, from: 'Post' });

    yield put({
      type: dateActionTypes.POST_DATE.SUCCESS,
    });

    yield put({ type: dateActionTypes.GET_MY_DATE_LIST.REQUEST });
  } catch (error) {
    console.log(error);
    Toast.show({
      text1: error?.response?.status,
      text2: error?.response?.data,
      type: 'error',
      position: 'top',
      topOffset: 100,
    });
    yield put({
      type: dateActionTypes.POST_DATE.FAIL,
    });
  }
}

export function* postDateLikeSaga({ dateId }) {
  const url = createAPI(`/date/like`);
  try {
    yield call(poster, { url, body: { dateId } });
    yield put({
      type: dateActionTypes.POST_DATE_LIKE.SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.POST_DATE_LIKE.FAIL,
    });
  }
}

export function* postDateCommentSaga({
  dateId,
  content,
  parsedComment,
  mentionList,
}) {
  const { user } = yield select((state) => state.auth);
  const url = createAPI(`/date/comment`);
  try {
    const { commentId } = yield call(poster, {
      url,
      body: { dateId, content, parsedContent: parsedComment, mentionList },
    });

    yield put({
      type: dateActionTypes.POST_DATE_COMMENT.SUCCESS,
      comment: {
        id: commentId,
        user,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.POST_DATE_COMMENT.FAIL,
    });
  }
}

export function* deleteDateCommentSaga({ commentId }) {
  const url = createAPI(`/date/comment/${commentId}`);
  const {
    date: { dateComment },
    commentList,
  } = yield select((state) => state.date);
  const dateCommentIndex = dateComment.findIndex((x) => x.id === commentId);
  const nextDateComment = fromJS(dateComment).toJS();
  const nextCommentList = fromJS(commentList).toJS();
  if (dateCommentIndex !== -1) {
    nextDateComment.splice(dateCommentIndex, 1);
  }
  const commentIndex = commentList.findIndex((x) => x.id === commentId);
  nextCommentList.splice(commentIndex, 1);

  try {
    yield call(deleter, { url });
    yield put({
      type: dateActionTypes.DELETE_DATE_COMMENT.SUCCESS,
      dateComment: nextDateComment,
      commentList: nextCommentList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.DELETE_DATE_COMMENT.FAIL,
    });
  }
}

export function* deleteDateLikeSaga({ dateId }) {
  const url = createAPI(`/date/like/${dateId}`);
  try {
    yield call(deleter, { url });
    yield put({
      type: dateActionTypes.DELETE_DATE_LIKE.SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.DELETE_DATE_LIKE.FAIL,
    });
  }
}

export function* deletePostSaga({ dateId }) {
  const url = createAPI(`/date/${dateId}`);
  try {
    yield call(deleter, { url });
    yield put({
      type: dateActionTypes.DELETE_POST.SUCCESS,
    });
    yield RootNavigation.pop();
    yield put({ type: dateActionTypes.GET_MY_DATE_LIST.REQUEST });
    yield put({ type: homeActionTypes.GET_DATE_TOP.REQUEST });
  } catch (error) {
    console.log(error);
    Alert.alert('플레이리스트에 속해있는 데이트입니다');
    yield put({
      type: dateActionTypes.DELETE_POST.FAIL,
    });
  }
}

export function* postDateFavoriteSaga({ dateId }) {
  const url = createAPI(`/date/favorite`);
  try {
    const body = { dateId };
    yield call(poster, { url, body });
    yield put({
      type: dateActionTypes.POST_DATE_FAVORITE.SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.POST_DATE_FAVORITE.FAIL,
    });
  }
}

export function* deleteDateFavoriteSaga({ dateId }) {
  const url = createAPI(`/date/favorite/${dateId}`);
  try {
    yield call(deleter, { url });
    yield put({
      type: dateActionTypes.DELETE_DATE_FAVORITE.SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.DELETE_POST.FAIL,
    });
  }
}

export function* getFeelingDetailSaga({ feelingType }) {
  const url = createAPI(`/date/feeling?type=${feelingType}`);
  try {
    const { result } = yield call(fetcher, url);
    const { img } = findTargetFeelingObj(feelingType);
    const coverImg = result.length > 0 ? result[0].mainImg : img;
    yield put({
      type: dateActionTypes.GET_FEELING_DETAIL.SUCCESS,
      result,
      coverImg,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_FEELING_DETAIL.FAIL,
    });
  }
}

export function* getThemeListSaga({ isAll }) {
  const url = createAPI(`/home/date/theme?isAll=${isAll.toString()}`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.GET_THEME_LIST.SUCCESS,
      result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_THEME_LIST.FAIL,
    });
  }
}

export function* getDateListByThemeSaga({ theme }) {
  const url = createAPI(`/home/date/theme/${theme}?isPage=true`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: dateActionTypes.GET_DATE_LIST_BY_THEME.SUCCESS,
      result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: dateActionTypes.GET_DATE_LIST_BY_THEME.FAIL,
    });
  }
}

export default function* dateSaga() {
  yield all([
    takeLatest(dateActionTypes.GET_MY_DATE_LIST.REQUEST, getMyDateListSaga),
    takeLatest(
      dateActionTypes.REFRESH_MY_DATE_LIST.REQUEST,
      refreshMyDateListSaga,
    ),
    takeLatest(dateActionTypes.GET_DATE_LIST.REQUEST, getDateListSaga),
    takeLatest(dateActionTypes.REFRESH_DATE_LIST.REQUEST, refreshDateListSaga),
    takeLatest(dateActionTypes.GET_GROUP_LIST.REQUEST, getGroupListSaga),
    takeLatest(dateActionTypes.GET_SUB_GROUP_LIST.REQUEST, getSubGroupListSaga),
    takeLatest(
      dateActionTypes.GET_DATE_FEATURE_LIST.REQUEST,
      getDateFeatureListSaga,
    ),
    takeLatest(dateActionTypes.GET_DATE.REQUEST, getDateSaga),
    takeLatest(
      dateActionTypes.GET_FEELING_DETAIL.REQUEST,
      getFeelingDetailSaga,
    ),
    takeLatest(dateActionTypes.GET_DATE_LIKE_LIST.REQUEST, getDateLikeListSaga),
    takeLatest(dateActionTypes.GET_DATE_COMMENT.REQUEST, getDateCommentSaga),
    takeLatest(dateActionTypes.POST_DATE.REQUEST, postDateSaga),
    takeLatest(dateActionTypes.UPDATE_REVIEW.REQUEST, updateReviewSaga),
    takeLatest(dateActionTypes.DELETE_POST.REQUEST, deletePostSaga),
    takeLatest(dateActionTypes.POST_DATE_LIKE.REQUEST, postDateLikeSaga),
    takeLatest(dateActionTypes.DELETE_DATE_LIKE.REQUEST, deleteDateLikeSaga),
    takeLatest(dateActionTypes.POST_DATE_COMMENT.REQUEST, postDateCommentSaga),
    takeLatest(
      dateActionTypes.DELETE_DATE_COMMENT.REQUEST,
      deleteDateCommentSaga,
    ),
    takeLatest(
      dateActionTypes.POST_DATE_FAVORITE.REQUEST,
      postDateFavoriteSaga,
    ),
    takeLatest(
      dateActionTypes.DELETE_DATE_FAVORITE.REQUEST,
      deleteDateFavoriteSaga,
    ),
    takeLatest(
      dateActionTypes.GET_DATE_LIST_BY_THEME.REQUEST,
      getDateListByThemeSaga,
    ),
    takeLatest(dateActionTypes.GET_THEME_LIST.REQUEST, getThemeListSaga),
  ]);
}
