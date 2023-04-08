/*
 * Auth reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import authActionTypes, { RESET_STORE } from '.';

// The initial state of the App
export const initialState = {
  loading: true,
  profileLoading: false,
  loginLoading: false,
  signUpLoading: false,
  nicknameCheckLoading: false,
  nicknameDuplicated: false,
  emailCheckLoading: false,
  emailDuplicated: false,
  verifyNumber: null,
  isDuplicated: false,
  phoneDuplicated: false,
  phoneCheckLoading: false,
  contactAuthorized: false,
  user: {
    id: null,
    nickname: '',
    phone: '',
    profileImg: '',
    kakaoId: null,
  },
  followerCount: 0,
  followingCount: 0,
  favoriteDate: [],
  favoriteDaply: [],
  favoriteLoading: false,
  searchedList: [],
  searchedLoading: false,
  kakaoLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case authActionTypes.LOG_IN.REQUEST:
        draft.loginLoading = true;
        break;

      case authActionTypes.LOG_IN.SUCCESS:
        draft.loginLoading = false;
        break;

      case authActionTypes.LOG_IN.FAIL:
        draft.loginLoading = false;
        break;

      case authActionTypes.INIT_KAKAO_LOGIN.REQUEST:
        draft.kakaoLoading = true;
        break;

      case authActionTypes.INIT_KAKAO_LOGIN.SUCCESS:
        draft.kakaoLoading = false;
        break;

      case authActionTypes.INIT_KAKAO_LOGIN.FAIL:
        draft.kakaoLoading = false;
        break;

      case authActionTypes.GET_ME.REQUEST:
        draft.loading = true;
        break;

      case authActionTypes.GET_ME.SUCCESS:
        draft.loading = false;
        draft.user = action.result;
        draft.followerCount = action.followerCount;
        draft.followingCount = action.followingCount;
        break;

      case authActionTypes.GET_ME.FAIL:
        draft.loading = false;
        break;

      case authActionTypes.POST_PHONE_VERIFY.SUCCESS:
        draft.verifyNumber = action.verifyNumber;
        break;

      case authActionTypes.POST_REGISTER.REQUEST:
        draft.signUpLoading = true;
        break;

      case authActionTypes.POST_REGISTER.SUCCESS:
        draft.signUpLoading = false;
        break;

      case authActionTypes.POST_REGISTER.FAIL:
        draft.signUpLoading = false;
        break;

      case authActionTypes.GET_NICKNAME_CHECK.REQUEST:
        draft.nicknameCheckLoading = true;
        break;
      case authActionTypes.GET_NICKNAME_CHECK.SUCCESS:
        draft.nicknameCheckLoading = false;
        draft.nicknameDuplicated = action.isDuplicated;
        break;
      case authActionTypes.GET_NICKNAME_CHECK.FAIL:
        draft.nicknameCheckLoading = false;
        break;

      case authActionTypes.GET_EMAIL_CHECK.REQUEST:
        draft.emailCheckLoading = true;
        break;
      case authActionTypes.GET_EMAIL_CHECK.SUCCESS:
        draft.emailCheckLoading = false;
        draft.emailDuplicated = action.isDuplicated;
        break;
      case authActionTypes.GET_EMAIL_CHECK.FAIL:
        draft.emailCheckLoading = false;
        break;

      case authActionTypes.LOG_OUT.SUCCESS:
        draft.user = initialState.user;
        break;

      case authActionTypes.GET_FAVORITE.REQUEST:
        draft.favoriteLoading = true;
        break;

      case authActionTypes.GET_FAVORITE.SUCCESS:
        draft.favoriteLoading = false;
        draft.favoriteDaply = action.favoriteDaply;
        draft.favoriteDate = action.favoriteDate;
        break;

      case authActionTypes.GET_FAVORITE.FAIL:
        draft.favoriteLoading = false;
        break;

      case authActionTypes.POST_PHONE_CHECK.REQUEST:
        draft.phoneCheckLoading = true;
        break;
      case authActionTypes.POST_PHONE_CHECK.SUCCESS:
        draft.phoneCheckLoading = false;
        draft.phoneDuplicated = action.phoneDuplicated;
        break;
      case authActionTypes.POST_PHONE_CHECK.FAIL:
        draft.phoneCheckLoading = false;
        break;
      case RESET_STORE:
        draft.loading = false;
        break;
      case authActionTypes.GET_PROFILE.REQUEST:
        draft.profileLoading = true;
        break;
      case authActionTypes.GET_PROFILE.SUCCESS:
        draft.profileLoading = false;
        draft.user = action.user;
        break;
      case authActionTypes.GET_PROFILE.FAIL:
        draft.profileLoading = false;
        break;

      case authActionTypes.GET_SEARCH_USER_VIEW.REQUEST:
        draft.searchedLoading = true;
        break;
      case authActionTypes.GET_SEARCH_USER_VIEW.SUCCESS:
        draft.searchedLoading = false;
        draft.searchedList = action.searchedList;
        break;
      case authActionTypes.GET_SEARCH_USER_VIEW.FAIL:
        draft.searchedLoading = false;
        break;
    }
  });

export default authReducer;
