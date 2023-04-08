export const RESET_STORE = 'RESET_STORE';

const authActionTypes = {
  LOG_IN: {
    REQUEST: 'Auth/LOG_IN_REQUEST',
    SUCCESS: 'Auth/LOG_IN_SUCCESS',
    FAIL: 'Auth/LOG_IN_FAIL',
  },
  LOG_OUT: {
    REQUEST: 'Auth/LOG_OUT_REQUEST',
    SUCCESS: 'Auth/LOG_OUT_SUCCESS',
    FAIL: 'Auth/LOG_OUT_FAIL',
  },
  GET_ME: {
    REQUEST: 'Auth/GET_ME_REQUEST',
    SUCCESS: 'Auth/GET_ME_SUCCESS',
    FAIL: 'Auth/GET_ME_FAIL',
  },
  GET_NICKNAME_CHECK: {
    REQUEST: 'Auth/GET_NICKNAME_CHECK_REQUEST',
    SUCCESS: 'Auth/GET_NICKNAME_CHECK_SUCCESS',
    FAIL: 'Auth/GET_NICKNAME_CHECK_FAIL',
  },
  GET_EMAIL_CHECK: {
    REQUEST: 'Auth/GET_EMAIL_CHECK_REQUEST',
    SUCCESS: 'Auth/GET_EMAIL_CHECK_SUCCESS',
    FAIL: 'Auth/GET_EMAIL_CHECK_FAIL',
  },
  POST_PHONE_VERIFY: {
    REQUEST: 'Auth/POST_PHONE_VERIFY_REQUEST',
    SUCCESS: 'Auth/POST_PHONE_VERIFY_SUCCESS',
    FAIL: 'Auth/POST_PHONE_VERIFY_FAIL',
  },
  POST_PHONE_CHECK: {
    REQUEST: 'Auth/POST_PHONE_CHECK_REQUEST',
    SUCCESS: 'Auth/POST_PHONE_CHECK_SUCCESS',
    FAIL: 'Auth/POST_PHONE_CHECK_FAIL',
  },
  POST_REGISTER: {
    REQUEST: 'Auth/POST_REGISTER_REQUEST',
    SUCCESS: 'Auth/POST_REGISTER_SUCCESS',
    FAIL: 'Auth/POST_REGISTER_FAIL',
  },
  PUT_PUSH_ALLOWED: {
    REQUEST: 'Auth/PUT_PUSH_ALLOWED_REQUEST',
    SUCCESS: 'Auth/PUT_PUSH_ALLOWED_SUCCESS',
    FAIL: 'Auth/PUT_PUSH_ALLOWED_FAIL',
  },
  GET_FOLLOWERLIST: {
    REQUEST: 'Auth/GET_FOLLOWERLIST_REQUEST',
    SUCCESS: 'Auth/GET_FOLLOWERLIST_SUCCESS',
    FAIL: 'Auth/GET_FOLLOWERLIST_FAIL',
  },
  GET_FOLLOWINGLIST: {
    REQUEST: 'Auth/GET_FOLLOWINGLIST_REQUEST',
    SUCCESS: 'Auth/GET_FOLLOWINGLIST_SUCCESS',
    FAIL: 'Auth/GET_FOLLOWINGLIST_FAIL',
  },
  GET_FAVORITE: {
    REQUEST: 'Auth/GET_FAVORITE_REQUEST',
    SUCCESS: 'Auth/GET_FAVORITE_SUCCESS',
    FAIL: 'Auth/GET_FAVORITE_FAIL',
  },
  UPDATE_PROFILE_IMAGE: {
    REQUEST: 'Auth/UPDATE_PROFILE_IMAGE_REQUEST',
    SUCCESS: 'Auth/UPDATE_PROFILE_IMAGE_SUCCESS',
    FAIL: 'Auth/UPDATE_PROFILE_IMAGE_FAIL',
  },
  GET_PROFILE: {
    REQUEST: 'Auth/GET_PROFILE_REQUEST',
    SUCCESS: 'Auth/GET_PROFILE_SUCCESS',
    FAIL: 'Auth/GET_PROFILE_FAIL',
  },
  GET_SEARCH_USER_VIEW: {
    REQUEST: 'Auth/GET_SEARCH_USER_VIEW_REQUEST',
    SUCCESS: 'Auth/GET_SEARCH_USER_VIEW_SUCCESS',
    FAIL: 'Auth/GET_SEARCH_USER_VIEW_FAIL',
  },
  INIT_KAKAO_LOGIN: {
    REQUEST: 'Auth/INIT_KAKAO_LOGIN_REQUEST',
    SUCCESS: 'Auth/INIT_KAKAO_LOGIN_SUCCESS',
    FAIL: 'Auth/INIT_KAKAO_LOGIN_FAIL',
  },
  SET_ONESIGNAL: {
    REQUEST: 'Auth/SET_ONESIGNAL_REQUEST',
    SUCCESS: 'Auth/SET_ONESIGNAL_SUCCESS',
    FAIL: 'Auth/SET_ONESIGNAL_FAIL',
  },
};

export const authActions = {
  logInAction: ({ phone, password }) => ({
    type: authActionTypes.LOG_IN.REQUEST,
    phone,
    password,
  }),
  logOutAction: () => ({
    type: authActionTypes.LOG_OUT.REQUEST,
  }),
  getMeAction: () => ({
    type: authActionTypes.GET_ME.REQUEST,
  }),
  getNicknameCheckAction: (nickname) => ({
    type: authActionTypes.GET_NICKNAME_CHECK.REQUEST,
    nickname,
  }),
  getEmailCheckAction: (email) => ({
    type: authActionTypes.GET_EMAIL_CHECK.REQUEST,
    email,
  }),
  postPhoneVerifyAction: (phone) => ({
    type: authActionTypes.POST_PHONE_VERIFY.REQUEST,
    phone,
  }),
  postPhoneCheck: (phone) => ({
    type: authActionTypes.POST_PHONE_CHECK.REQUEST,
    phone,
  }),
  postRegisterAction: (payload) => ({
    type: authActionTypes.POST_REGISTER.REQUEST,
    payload,
  }),
  putPushAllowed: ({ pushAllowed, signalId }) => ({
    type: authActionTypes.PUT_PUSH_ALLOWED.REQUEST,
    pushAllowed,
    signalId,
  }),
  getFollowingList: () => ({
    type: authActionTypes.GET_FOLLOWINGLIST.REQUEST,
  }),
  getFollowerList: () => ({
    type: authActionTypes.GET_FOLLOWERLIST.REQUEST,
  }),
  resetStore: () => ({
    type: RESET_STORE,
  }),
  getFavorite: () => ({
    type: authActionTypes.GET_FAVORITE.REQUEST,
  }),
  updateProfileImg: (profileImg) => ({
    type: authActionTypes.UPDATE_PROFILE_IMAGE.REQUEST,
    profileImg,
  }),
  getSearchUserView: () => ({
    type: authActionTypes.GET_SEARCH_USER_VIEW.REQUEST,
  }),
  initKakaoLogin: () => ({
    type: authActionTypes.INIT_KAKAO_LOGIN.REQUEST,
  }),
  setOneSignal: () => ({
    type: authActionTypes.SET_ONESIGNAL.REQUEST,
  }),
  // to reset the state of redux store
};

export default authActionTypes;
