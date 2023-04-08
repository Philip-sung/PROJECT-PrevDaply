/*
 * User reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import userActionTypes from '.';

// The initial state of the App
export const initialState = {
  userDetail: {
    id: null,
    nickname: '',
  },
  userDetailLoading: false,
  contactListLoading: false,
  contactList: [{ id: -1 }],
  allContactList: [],
  contactAuthorized: false,
  followLoading: false,
  deleteFollowLoading: false,
  followMap: { id: null },
  followerList: [],
  followerListLoading: false,
  followingListLoading: false,
  followingList: [],
  followerCount: 0,
  userSearched: [],
  userSearchLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const userRedcuer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case userActionTypes.GET_ALL_CONTACTS.REQUEST:
        draft.contactListLoading = true;
        break;

      case userActionTypes.GET_ALL_CONTACTS.SUCCESS:
        draft.contactListLoading = false;
        draft.contactList = [{ id: -1 }, ...action.contacts];
        draft.allContactList = action.contacts;
        draft.contactAuthorized = action.contactAuthorized;
        break;

      case userActionTypes.GET_ALL_CONTACTS.FAIL:
        draft.contactListLoading = false;
        break;

      case userActionTypes.SEARCH_CONTACTS.SUCCESS:
        draft.contactList = [{ id: -1 }, ...action.contactList];
        break;

      case userActionTypes.SELECT_CONTACT.SUCCESS:
        draft.contactList = action.contactList;
        break;

      case userActionTypes.GET_USER_DETAIL.REQUEST:
        draft.userDetailLoading = true;
        break;

      case userActionTypes.GET_USER_DETAIL.SUCCESS:
        draft.userDetailLoading = false;
        draft.userDetail = action.userDetail;
        draft.followerCount = action.followerCount;
        break;

      case userActionTypes.GET_USER_DETAIL.FAIL:
        draft.userDetailLoading = false;
        break;

      case userActionTypes.POST_FOLLOW.REQUEST:
        draft.followLoading = true;
        break;

      case userActionTypes.POST_FOLLOW.SUCCESS:
        draft.followLoading = false;
        draft.followerCount += 1;
        break;

      case userActionTypes.POST_FOLLOW.FAIL:
        draft.followLoading = false;
        break;

      case userActionTypes.VERIFY_FOLLOW.SUCCESS:
        draft.followMap = action.followMap || initialState.followMap;
        break;

      case userActionTypes.DELETE_FOLLOW.REQUEST:
        draft.deleteFollowLoading = true;
        break;

      case userActionTypes.DELETE_FOLLOW.SUCCESS:
        draft.followMap = initialState.followMap;
        draft.deleteFollowLoading = false;
        draft.followerCount -= 1;
        break;

      case userActionTypes.DELETE_FOLLOW.FAIL:
        draft.deleteFollowLoading = false;
        break;

      case userActionTypes.GET_FOLLOWERLIST.REQUEST:
        draft.followerListLoading = true;
        break;

      case userActionTypes.GET_FOLLOWERLIST.SUCCESS:
        draft.followerListLoading = false;
        draft.followerList = action.followerList;
        break;

      case userActionTypes.GET_FOLLOWERLIST.FAIL:
        draft.followerListLoading = false;
        break;

      case userActionTypes.GET_FOLLOWINGLIST.REQUEST:
        draft.followingListLoading = true;
        break;

      case userActionTypes.GET_FOLLOWINGLIST.SUCCESS:
        draft.followingListLoading = false;
        draft.followingList = action.followingList;
        break;

      case userActionTypes.GET_FOLLOWINGLIST.FAIL:
        draft.followingListLoading = false;
        break;

      case userActionTypes.SEARCH_USER.REQUEST:
        draft.userSearchLoading = true;
        break;

      case userActionTypes.SEARCH_USER.SUCCESS:
        draft.userSearchLoading = false;
        draft.userSearched = action.result;
        break;

      case userActionTypes.SEARCH_USER.FAIL:
        draft.userSearchLoading = false;
        break;

      case userActionTypes.INIT_USER:
        draft.userDetail = initialState.userDetail;
        break;
    }
  });

export default userRedcuer;
