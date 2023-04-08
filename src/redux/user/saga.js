import { call, put, all, takeLatest, select, take } from 'redux-saga/effects';
import { Platform, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import { fromJS } from 'immutable';
import { createAPI, fetcher, poster, deleter } from '~/hooks/requests';
import * as RootNavigation from '~/routes/navigation';
import userActionTypes, { userActions } from '.';
import { formatPhone } from '../../utils';
import dateActionTypes from '../date';
import { getFollowingMerged } from './utils';
import daplyActionTypes from '../daply';

export function* getAllContacts() {
  const allContacts = yield Contacts.getAll();
  try {
    const contacts = allContacts.map((x) => {
      const parsed =
        x.phoneNumbers[0] && x.phoneNumbers[0].number.match(/\d/g).join('');
      return {
        id: x.recordID,
        phone: formatPhone(parsed),
        lastName: x.familyName,
        firstName: x.givenName,
        fullName: `${x.familyName}${x.givenName}`,
        selected: false,
      };
    });
    const filtered = contacts.filter((x) => x.fullName.length > 1);
    return filtered;
  } catch (error) {
    return [];
  }
}

export function* getContacts() {
  // 1. 승인체크
  const hasPermitted = yield Contacts.checkPermission();
  let contactAuthorized = hasPermitted === 'authorized';
  let contacts = [];

  // 2. 체크했을시
  if (contactAuthorized) {
    contacts = yield getAllContacts();
  } else if (Platform.OS === 'ios') {
    const iosPermission = yield Contacts.requestPermission();
    const iosPermited = iosPermission === 'authorized';
    contactAuthorized = iosPermited;
    if (iosPermission === 'authorized') {
      contacts = yield getAllContacts();
    } else {
      contacts = [];
    }
  } else {
    yield PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: '전화번호부 가져오기',
        message: '데플리가 여러분의 연락처에 접근하려고 합니다',
        buttonPositive: '확인',
      },
    );
    contacts = yield getAllContacts();
  }
  return { contacts, contactAuthorized };
}

export function* searchContactsSaga({ searchValue }) {
  const userState = yield select((state) => state.user);
  const { allContactList } = userState;

  const result = _.filter(
    allContactList,
    (p) => p.fullName.indexOf(searchValue) !== -1,
  );
  yield put({
    type: userActionTypes.SEARCH_CONTACTS.SUCCESS,
    contactList: result,
  });
}

export function* selectContactSaga({ contact }) {
  const userState = yield select((state) => state.user);
  const { contactList } = userState;

  const copied = fromJS(contactList).toJS();

  const targetIndex = copied.findIndex((x) => x.id === contact.id);
  const target = copied[targetIndex];

  copied.splice(targetIndex, 1, { ...target, selected: !target.selected });

  yield put({
    type: userActionTypes.SELECT_CONTACT.SUCCESS,
    contactList: copied,
  });
}

export function* getContactListSaga() {
  try {
    // const { documents } = yield call(fetcher, url);

    const { contacts, contactAuthorized } = yield getContacts();
    const followingUrl = createAPI('/follow/following');
    const { followingList } = yield call(fetcher, followingUrl);
    const followingMerged = getFollowingMerged({ contacts, followingList });

    yield put({
      type: userActionTypes.GET_ALL_CONTACTS.SUCCESS,
      contacts: followingMerged,
      contactAuthorized,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userActionTypes.GET_ALL_CONTACTS.FAIL,
    });
  }
}

export function* getUserDetailSaga({ userId, from }) {
  const url = createAPI(`/user/${userId}?from=${from}`);
  try {
    const { userDetail, followerCount } = yield call(fetcher, url);

    yield put({
      type: userActionTypes.GET_USER_DETAIL.SUCCESS,
      userDetail,
      followerCount,
    });

    yield put({
      type: dateActionTypes.GET_DATE_LIST.REQUEST,
      userId,
    });

    yield put({
      type: daplyActionTypes.GET_DAPLY_LIST.REQUEST,
      userId,
    });

    const { user } = yield select((state) => state.auth);
    if (user.id) {
      yield put({ type: userActionTypes.VERIFY_FOLLOW.REQUEST, userId });
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      Toast.show({
        text1: '차단된 유저입니다!',
        type: 'error',
        position: 'top',
        topOffset: 100,
      });
      RootNavigation.pop();
    }
    yield put({
      type: userActionTypes.GET_USER_DETAIL.FAIL,
    });
  }
}

export function* getFollowerListSaga({ userId }) {
  const params = userId ? `?userId=${userId}` : '';
  const url = createAPI(`/follow/follower${params}`);
  try {
    const { followerList } = yield call(fetcher, url);
    yield put({
      type: userActionTypes.GET_FOLLOWERLIST.SUCCESS,
      followerList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userActionTypes.GET_FOLLOWERLIST.FAIL,
    });
  }
}

export function* getFollowingListSaga({ userId }) {
  const params = userId ? `?userId=${userId}` : '';
  const url = createAPI(`/follow/following${params}`);
  try {
    const { followingList } = yield call(fetcher, url);

    yield put({
      type: userActionTypes.GET_FOLLOWINGLIST.SUCCESS,
      followingList,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userActionTypes.GET_FOLLOWERLIST.FAIL,
    });
  }
}

export function* verifyFollowSaga({ userId }) {
  const url = createAPI(`/follow/verify?userId=${userId}`);
  try {
    const { followMap } = yield call(fetcher, url);
    yield put({
      type: userActionTypes.VERIFY_FOLLOW.SUCCESS,
      followMap,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userActionTypes.VERIFY_FOLLOW.FAIL,
    });
  }
}

export function* postFollowSaga({ followingId }) {
  const url = createAPI(`/follow`);
  const body = { followingId };
  try {
    yield call(poster, { url, body });
    yield put({
      type: userActionTypes.POST_FOLLOW.SUCCESS,
    });
    yield put({
      type: userActionTypes.VERIFY_FOLLOW.REQUEST,
      userId: followingId,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userActionTypes.POST_FOLLOW.FAIL,
    });
  }
}

export function* blockUserSaga({ blockUserId }) {
  const url = createAPI(`/user/block`);
  const body = { blockUserId };
  try {
    yield call(poster, { url, body });
    yield put({
      type: userActionTypes.BLOCK_USER.SUCCESS,
    });
    yield RootNavigation.pop();
  } catch (error) {
    console.log(error);
    yield put({
      type: userActionTypes.BLOCK_USER.FAIL,
    });
  }
}

export function* deleteFollowSaga({ followMap }) {
  const url = createAPI(`/follow`);
  const body = { followMapId: followMap.id };
  try {
    yield call(deleter, { url, body });
    yield put({
      type: userActionTypes.DELETE_FOLLOW.SUCCESS,
    });
    yield put({
      type: userActionTypes.VERIFY_FOLLOW.REQUEST,
      userId: followMap.followingId,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userActionTypes.POST_FOLLOW.FAIL,
    });
  }
}

export function* getUserSearchSaga({ nickname }) {
  const url = createAPI(`/search/user?q=${nickname}`);
  try {
    const { result } = yield call(fetcher, url);
    const transformed = result.map((x) => ({
      ...x,
      name: x.nickname,
    }));

    yield put({
      type: userActionTypes.SEARCH_USER.SUCCESS,
      result: transformed,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: userActionTypes.SEARCH_USER.FAIL,
    });
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(userActionTypes.GET_ALL_CONTACTS.REQUEST, getContactListSaga),
    takeLatest(userActionTypes.SEARCH_CONTACTS.REQUEST, searchContactsSaga),
    takeLatest(userActionTypes.SELECT_CONTACT.REQUEST, selectContactSaga),
    takeLatest(userActionTypes.GET_USER_DETAIL.REQUEST, getUserDetailSaga),
    takeLatest(userActionTypes.GET_FOLLOWERLIST.REQUEST, getFollowerListSaga),
    takeLatest(userActionTypes.GET_FOLLOWINGLIST.REQUEST, getFollowingListSaga),
    takeLatest(userActionTypes.POST_FOLLOW.REQUEST, postFollowSaga),
    takeLatest(userActionTypes.VERIFY_FOLLOW.REQUEST, verifyFollowSaga),
    takeLatest(userActionTypes.DELETE_FOLLOW.REQUEST, deleteFollowSaga),
    takeLatest(userActionTypes.SEARCH_USER.REQUEST, getUserSearchSaga),
    takeLatest(userActionTypes.BLOCK_USER.REQUEST, blockUserSaga),
  ]);
}
