const userActionTypes = {
  GET_ALL_CONTACTS: {
    REQUEST: 'User/GET_ALL_CONTACTS_REQUEST',
    SUCCESS: 'User/GET_ALL_CONTACTS_SUCCESS',
    FAIL: 'User/GET_ALL_CONTACTS_FAIL',
  },
  SEARCH_CONTACTS: {
    REQUEST: 'User/SEARCH_CONTACTS_REQUEST',
    SUCCESS: 'User/SEARCH_CONTACTS_SUCCESS',
    FAIL: 'User/SEARCH_CONTACTS_FAIL',
  },
  SELECT_CONTACT: {
    REQUEST: 'User/SELECT_CONTACT_REQUEST',
    SUCCESS: 'User/SELECT_CONTACT_SUCCESS',
    FAIL: 'User/SELECT_CONTACT_FAIL',
  },
  GET_USER_DETAIL: {
    REQUEST: 'User/GET_USER_DETAIL_REQUEST',
    SUCCESS: 'User/GET_USER_DETAIL_SUCCESS',
    FAIL: 'User/GET_USER_DETAIL_FAIL',
  },
  GET_FOLLOWERLIST: {
    REQUEST: 'User/GET_FOLLOWERLIST_REQUEST',
    SUCCESS: 'User/GET_FOLLOWERLIST_SUCCESS',
    FAIL: 'User/GET_FOLLOWERLIST_FAIL',
  },
  GET_FOLLOWINGLIST: {
    REQUEST: 'User/GET_FOLLOWINGLIST_REQUEST',
    SUCCESS: 'User/GET_FOLLOWINGLIST_SUCCESS',
    FAIL: 'User/GET_FOLLOWINGLIST_FAIL',
  },
  VERIFY_FOLLOW: {
    REQUEST: 'User/VERIFY_FOLLOW_REQUEST',
    SUCCESS: 'User/VERIFY_FOLLOW_SUCCESS',
    FAIL: 'User/VERIFY_FOLLOW_FAIL',
  },
  POST_FOLLOW: {
    REQUEST: 'User/POST_FOLLOW_REQUEST',
    SUCCESS: 'User/POST_FOLLOW_SUCCESS',
    FAIL: 'User/POST_FOLLOW_FAIL',
  },
  DELETE_FOLLOW: {
    REQUEST: 'User/DELETE_FOLLOW_REQUEST',
    SUCCESS: 'User/DELETE_FOLLOW_SUCCESS',
    FAIL: 'User/DELETE_FOLLOW_FAIL',
  },
  SEARCH_USER: {
    REQUEST: 'User/SEARCH_USER_REQUEST',
    SUCCESS: 'User/SEARCH_USER_SUCCESS',
    FAIL: 'User/SEARCH_USER_FAIL',
  },
  BLOCK_USER: {
    REQUEST: 'User/BLOCK_USER_REQUEST',
    SUCCESS: 'User/BLOCK_USER_SUCCESS',
    FAIL: 'User/BLOCK_USER_FAIL',
  },
  INIT_USER: 'User/INIT_USER',
};

export const userActions = {
  getAllContacts: () => ({
    type: userActionTypes.GET_ALL_CONTACTS.REQUEST,
  }),
  searchContacts: (searchValue) => ({
    type: userActionTypes.SEARCH_CONTACTS.REQUEST,
    searchValue,
  }),
  selectContact: (contact) => ({
    type: userActionTypes.SELECT_CONTACT.REQUEST,
    contact,
  }),
  getUserDetail: (userId, from) => ({
    type: userActionTypes.GET_USER_DETAIL.REQUEST,
    userId,
    from,
  }),
  getFollowingList: (userId) => ({
    type: userActionTypes.GET_FOLLOWINGLIST.REQUEST,
    userId,
  }),
  getFollowerList: (userId) => ({
    type: userActionTypes.GET_FOLLOWERLIST.REQUEST,
    userId,
  }),
  verifyFollow: (userId) => ({
    type: userActionTypes.VERIFY_FOLLOW.REQUEST,
    userId,
  }),
  postFollow: (followingId) => ({
    type: userActionTypes.POST_FOLLOW.REQUEST,
    followingId,
  }),
  deleteFollow: (followMap) => ({
    type: userActionTypes.DELETE_FOLLOW.REQUEST,
    followMap,
  }),
  searchUser: (nickname) => ({
    type: userActionTypes.SEARCH_USER.REQUEST,
    nickname,
  }),
  initUser: () => ({
    type: userActionTypes.INIT_USER,
  }),
  blockUser: (blockUserId) => ({
    type: userActionTypes.BLOCK_USER.REQUEST,
    blockUserId,
  }),
};

export default userActionTypes;
