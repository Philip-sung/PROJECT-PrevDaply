/* eslint-disable camelcase */
import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import OneSignal from 'react-native-onesignal';
import KakaoSDK from '@actbase/react-kakaosdk';

import {
  createAPI,
  fetcher,
  poster,
  setItemToAsync,
  removeItemToAsync,
  updater,
} from '~/hooks/requests';
import * as RootNavigation from '~/routes/navigation';
import authActionTypes, { RESET_STORE } from '.';
import notiActionTypes from '../notification';
import dateActionTypes from '../date';
import { KAKAO_CONSTANT } from '../../constants';
import { uploadToS3 } from '../../utils/image';

export function* logInSaga({ phone, password }) {
  const url = createAPI('/auth/login');
  try {
    const { token } = yield call(poster, {
      url,
      body: { phone, password },
    });
    yield setItemToAsync('idToken', token);
    yield setItemToAsync('phone', phone);
    yield RootNavigation.resetRoot('MainTab');
    yield put({
      type: authActionTypes.LOG_IN.SUCCESS,
    });
    yield put({
      type: authActionTypes.GET_ME.REQUEST,
    });
    yield put({
      type: dateActionTypes.GET_MY_DATE_LIST.REQUEST,
    });
  } catch (error) {
    if (error.response.status === 406) {
      Toast.show({
        text1: '휴대폰 번호로 가입하셨네요!',
        text2: '휴대폰 번호로 로그인해주세요',
        type: 'error',
        position: 'top',
        topOffset: 100,
      });
    } else {
      Toast.show({
        text1: '로그인에 실패하였습니다!',
        text2: '휴대폰번호와 비밀번호를 확인해주세요',
        type: 'error',
        position: 'top',
        topOffset: 100,
      });
    }

    yield put({
      type: authActionTypes.LOG_IN.FAIL,
    });
  }
}

export function* kakaoSaga() {
  const url = createAPI('/auth/login');
  try {
    yield KakaoSDK.init(KAKAO_CONSTANT.APP_TOKEN);
    const tokens = yield KakaoSDK.login();
    const profile = yield KakaoSDK.getProfile();
    const kakaoToken = tokens.access_token;
    const { kakao_account, id } = profile;
    const { email, phone_number } = kakao_account;
    const splited = phone_number.split(' ')[1];
    const phone = `0${splited}`;
    const result = yield call(poster, {
      url,
      body: { phone, kakaoToken, kakaoId: id },
    });
    if (result === 'needRegister') {
      yield put({
        type: authActionTypes.INIT_KAKAO_LOGIN.SUCCESS,
      });
      yield RootNavigation.navigate('Nickname', {
        phone,
        email,
        isKakao: true,
        kakaoId: id,
      });
    } else {
      yield setItemToAsync('idToken', result.token);
      yield setItemToAsync('phone', phone);
      yield RootNavigation.resetRoot('MainTab');
      yield put({
        type: authActionTypes.INIT_KAKAO_LOGIN.SUCCESS,
      });
      yield put({
        type: authActionTypes.GET_ME.REQUEST,
      });
    }
  } catch (error) {
    if (error.response.status === 406) {
      Toast.show({
        text1: '휴대폰 번호로 가입하셨네요!',
        text2: '휴대폰 번호로 로그인해주세요',
        type: 'error',
        position: 'top',
        topOffset: 100,
      });
    } else {
      Toast.show({
        text1: '로그인에 실패하였습니다!',
        text2: '휴대폰번호와 비밀번호를 확인해주세요',
        type: 'error',
        position: 'top',
        topOffset: 100,
      });
    }

    yield put({
      type: authActionTypes.LOG_IN.FAIL,
    });
  }
}

export function* logOutSaga() {
  try {
    const { user } = yield select((state) => state.auth);
    const deviceState = yield OneSignal.getDeviceState();
    const { userId } = deviceState;
    yield put({
      type: authActionTypes.PUT_PUSH_ALLOWED.REQUEST,
      signalId: userId,
      pushAllowed: 0,
    });
    // if (user.kakaoId) {
    //   yield KakaoSDK.logout();
    // }
    yield removeItemToAsync('idToken');
    OneSignal.removeExternalUserId();

    yield put({
      type: authActionTypes.LOG_OUT.SUCCESS,
    });
    yield put({ type: RESET_STORE });
    yield RootNavigation.reset('Init');
  } catch (error) {
    console.log(error);
    yield put({
      type: authActionTypes.LOG_OUT.FAIL,
    });
  }
}

function promptNoti() {
  return new Promise((resolve) => {
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      resolve(response);
    });
  });
}

function setUserId2OneSignal(userId) {
  return new Promise((resolve) => {
    OneSignal.setExternalUserId(userId, (results) => {
      resolve(results);
    });
  });
}

export function* setOneSignalIdSaga() {
  try {
    const {
      user: { id },
    } = yield select((state) => state.auth);
    yield call(setUserId2OneSignal(id.toString()));
    yield put({ type: authActionTypes.SET_ONESIGNAL.SUCCESS });
  } catch (err) {
    console.log(err);
    yield put({ type: authActionTypes.SET_ONESIGNAL.FAIL });
  }
}

export function* putPushAllowedSaga({ pushAllowed, signalId }) {
  const url = createAPI(`/auth/push-allowed`);
  try {
    yield call(updater, { url, body: { pushAllowed, signalId } });
    yield put({
      type: authActionTypes.PUT_PUSH_ALLOWED.SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({ type: authActionTypes.PUT_PUSH_ALLOWED.FAIL });
  }
}

export function* getMeSaga() {
  const url = createAPI('/auth/me');
  try {
    const { result, followingCount, followerCount } = yield call(fetcher, url);
    // 카카오 로그인했을 시 카카오 init
    if (result.kakaoId) {
      yield KakaoSDK.init(KAKAO_CONSTANT.APP_TOKEN);
    }
    yield put({
      type: authActionTypes.GET_ME.SUCCESS,
      result,
      followerCount,
      followingCount,
    });
    yield setItemToAsync('userId', result.id);
    const deviceState = yield OneSignal.getDeviceState();
    const { userId } = deviceState;
    const allowed = yield call(promptNoti);
    if (allowed === true) {
      yield put({
        type: authActionTypes.PUT_PUSH_ALLOWED.REQUEST,
        pushAllowed: 1,
        signalId: userId,
      });
      yield call(setUserId2OneSignal(result.id.toString()));
    }

    yield put({ type: notiActionTypes.GET_NOTI_LIST.REQUEST });
    yield put({ type: authActionTypes.GET_SEARCH_USER_VIEW.REQUEST });
  } catch (error) {
    yield put({
      type: authActionTypes.GET_ME.FAIL,
    });
  }
}

export function* postVerifyNumberSaga({ phone }) {
  const url = createAPI('/auth/phone/verify');
  try {
    const { verifyNumber } = yield call(poster, { url, body: { phone } });
    yield put({
      type: authActionTypes.POST_PHONE_VERIFY.SUCCESS,
      verifyNumber,
    });
  } catch (err) {
    console.log(err);
    yield put({ type: authActionTypes.POST_PHONE_VERIFY.FAIL });
  }
}

export function* postPhoneCheckSaga({ phone }) {
  const url = createAPI('/auth/phone/check');
  try {
    const { phoneDuplicated } = yield call(poster, { url, body: { phone } });
    yield put({
      type: authActionTypes.POST_PHONE_CHECK.SUCCESS,
      phoneDuplicated,
    });
  } catch (err) {
    console.log(err);
    yield put({ type: authActionTypes.POST_PHONE_CHECK.FAIL });
  }
}

export function* postRegisterSaga({ payload }) {
  const url = createAPI('/auth/register');
  try {
    const { token } = yield call(poster, {
      url,
      body: { ...payload },
    });

    yield setItemToAsync('idToken', token);
    yield setItemToAsync('phone', payload.phone);
    yield RootNavigation.resetRoot('MainTab');
    yield put({
      type: authActionTypes.POST_REGISTER.SUCCESS,
    });
    yield put({
      type: authActionTypes.GET_ME.REQUEST,
    });
  } catch (err) {
    console.log(err.response);
    yield put({ type: authActionTypes.POST_REGISTER.FAIL });
  }
}

export function* getNicknameCheckSaga({ nickname }) {
  const url = createAPI(`/auth/nickname?q=${nickname}`);
  try {
    const { isDuplicated } = yield call(fetcher, url);
    yield put({
      type: authActionTypes.GET_NICKNAME_CHECK.SUCCESS,
      isDuplicated,
    });
  } catch (err) {
    yield put({ type: authActionTypes.GET_NICKNAME_CHECK.FAIL });
  }
}

export function* getEmailCheckSaga({ email }) {
  const url = createAPI(`/auth/email?q=${email}`);
  try {
    const { isDuplicated } = yield call(fetcher, url);
    yield put({
      type: authActionTypes.GET_EMAIL_CHECK.SUCCESS,
      isDuplicated,
    });
  } catch (err) {
    yield put({ type: authActionTypes.GET_EMAIL_CHECK.FAIL });
  }
}

export function* getFollowerListSaga() {
  const url = createAPI(`/follow/follower`);
  try {
    const { followerList } = yield call(fetcher, url);

    yield put({
      type: authActionTypes.GET_FOLLOWERLIST.SUCCESS,
      followerList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: authActionTypes.GET_FOLLOWERLIST.FAIL,
    });
  }
}

export function* getFollowingListSaga() {
  const url = createAPI(`/follow/following`);
  try {
    const { followingList } = yield call(fetcher, url);

    yield put({
      type: authActionTypes.GET_FOLLOWINGLIST.SUCCESS,
      followingList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: authActionTypes.GET_FOLLOWERLIST.FAIL,
    });
  }
}

export function* getFavoriteSaga() {
  const url = createAPI(`/auth/favorite`);
  try {
    const { favoriteDate, favoriteDaply } = yield call(fetcher, url);
    yield put({
      type: authActionTypes.GET_FAVORITE.SUCCESS,
      favoriteDate,
      favoriteDaply,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: authActionTypes.GET_FAVORITE.FAIL,
    });
  }
}

export function* getProfileSaga() {
  const url = createAPI(`/auth/me`);
  try {
    const { result } = yield call(fetcher, url);
    yield put({
      type: authActionTypes.GET_PROFILE.SUCCESS,
      user: result,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: authActionTypes.GET_PROFILE.FAIL,
    });
  }
}

export function* getUserSearchViewSaga() {
  const url = createAPI(`/search/user/view`);
  try {
    const { result } = yield call(fetcher, url);
    const transformed = result.map((x) => ({
      id: x.creator.id,
      name: x.creator.nickname,
      profileImg: x.creator.profileImg,
    }));
    yield put({
      type: authActionTypes.GET_SEARCH_USER_VIEW.SUCCESS,
      searchedList: transformed,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: authActionTypes.GET_SEARCH_USER_VIEW.FAIL,
    });
  }
}

export function* updateProfileImgSaga({ profileImg }) {
  const url = createAPI(`/auth/profile/profileImage`);
  try {
    const userState = yield select((state) => state.auth);
    const {
      user: { id },
    } = userState;

    const [s3result] = yield uploadToS3(id, [profileImg]);
    const { key, uri } = s3result;
    yield call(updater, {
      url,
      body: { imgKey: key, imgUrl: uri },
    });
    yield put({
      type: authActionTypes.UPDATE_PROFILE_IMAGE.SUCCESS,
    });
    yield put({
      type: authActionTypes.GET_PROFILE.REQUEST,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: authActionTypes.UPDATE_PROFILE_IMAGE.FAIL,
    });
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(authActionTypes.LOG_IN.REQUEST, logInSaga),
    takeLatest(authActionTypes.INIT_KAKAO_LOGIN.REQUEST, kakaoSaga),
    takeLatest(authActionTypes.LOG_OUT.REQUEST, logOutSaga),
    takeLatest(authActionTypes.POST_PHONE_VERIFY.REQUEST, postVerifyNumberSaga),
    takeLatest(authActionTypes.POST_PHONE_CHECK.REQUEST, postPhoneCheckSaga),
    takeLatest(authActionTypes.GET_EMAIL_CHECK.REQUEST, getEmailCheckSaga),
    takeLatest(
      authActionTypes.GET_NICKNAME_CHECK.REQUEST,
      getNicknameCheckSaga,
    ),
    takeLatest(authActionTypes.POST_REGISTER.REQUEST, postRegisterSaga),
    takeLatest(authActionTypes.GET_ME.REQUEST, getMeSaga),
    takeLatest(authActionTypes.PUT_PUSH_ALLOWED.REQUEST, putPushAllowedSaga),
    takeLatest(authActionTypes.GET_FAVORITE.REQUEST, getFavoriteSaga),
    takeLatest(
      authActionTypes.UPDATE_PROFILE_IMAGE.REQUEST,
      updateProfileImgSaga,
    ),
    takeLatest(authActionTypes.GET_PROFILE.REQUEST, getProfileSaga),
    takeLatest(
      authActionTypes.GET_SEARCH_USER_VIEW.REQUEST,
      getUserSearchViewSaga,
    ),
    takeLatest(authActionTypes.SET_ONESIGNAL.REQUEST, setOneSignalIdSaga),
  ]);
}
