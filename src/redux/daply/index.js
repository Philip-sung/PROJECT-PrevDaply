const daplyActionTypes = {
  GET_MY_DAPLY_LIST: {
    REQUEST: 'Daply/GET_MY_DAPLY_LIST_REQUEST',
    SUCCESS: 'Daply/GET_MY_DAPLY_LIST_SUCCESS',
    FAIL: 'Daply/GET_MY_DAPLY_LIST_FAIL',
  },
  GET_DAPLY_LIST_BY_CATEGORY: {
    REQUEST: 'Daply/GET_DAPLY_LIST_BY_CATEGORY_REQUEST',
    SUCCESS: 'Daply/GET_DAPLY_LIST_BY_CATEGORY_SUCCESS',
    FAIL: 'Daply/GET_DAPLY_LIST_BY_CATEGORY_FAIL',
  },
  REFRESH_MY_DAPLY_LIST: {
    REQUEST: 'Daply/REFRESH_MY_DAPLY_LIST_REQUEST',
    SUCCESS: 'Daply/REFRESH_MY_DAPLY_LIST_SUCCESS',
    FAIL: 'Daply/REFRESH_MY_DAPLY_LIST_FAIL',
  },
  GET_DAPLY_LIST: {
    REQUEST: 'Daply/GET_DAPLY_LIST_REQUEST',
    SUCCESS: 'Daply/GET_DAPLY_LIST_SUCCESS',
    FAIL: 'Daply/GET_DAPLY_LIST_FAIL',
  },
  GET_DAPLY_LIKE_LIST: {
    REQUEST: 'Daply/GET_DAPLY_LIKE_LIST_REQUEST',
    SUCCESS: 'Daply/GET_DAPLY_LIKE_LIST_SUCCESS',
    FAIL: 'Daply/GET_DAPLY_LIKE_LIST_FAIL',
  },
  REFRESH_DAPLY_LIST: {
    REQUEST: 'Daply/REFRESH_DAPLY_LIST_REQUEST',
    SUCCESS: 'Daply/REFRESH_DAPLY_LIST_SUCCESS',
    FAIL: 'Daply/REFRESH_DAPLY_LIST_FAIL',
  },
  GET_DAPLY: {
    REQUEST: 'Daply/GET_DAPLY_REQUEST',
    SUCCESS: 'Daply/GET_DAPLY_SUCCESS',
    FAIL: 'Daply/GET_DAPLY_FAIL',
  },
  GET_DAPLY_COMMENT: {
    REQUEST: 'Daply/GET_DAPLY_COMMENT_REQUEST',
    SUCCESS: 'Daply/GET_DAPLY_COMMENT_SUCCESS',
    FAIL: 'Daply/GET_DAPLY_COMMENT_FAIL',
  },
  POST_DAPLY: {
    REQUEST: 'Daply/POST_DAPLY_REQUEST',
    SUCCESS: 'Daply/POST_DAPLY_SUCCESS',
    FAIL: 'Daply/POST_DAPLY_FAIL',
  },
  POST_DAPLY_LIKE: {
    REQUEST: 'Daply/POST_DAPLY_LIKE_REQUEST',
    SUCCESS: 'Daply/POST_DAPLY_LIKE_SUCCESS',
    FAIL: 'Daply/POST_DAPLY_LIKE_FAIL',
  },
  POST_DAPLY_FAVORITE: {
    REQUEST: 'Daply/POST_DAPLY_FAVORITE_REQUEST',
    SUCCESS: 'Daply/POST_DAPLY_FAVORITE_SUCCESS',
    FAIL: 'Daply/POST_DAPLY_FAVORITE_FAIL',
  },
  DELETE_DAPLY_LIKE: {
    REQUEST: 'Daply/DELETE_DAPLY_LIKE_REQUEST',
    SUCCESS: 'Daply/DELETE_DAPLY_LIKE_SUCCESS',
    FAIL: 'Daply/DELETE_DAPLY_LIKE_FAIL',
  },
  DELETE_DAPLY: {
    REQUEST: 'Daply/DELETE_DAPLY_REQUEST',
    SUCCESS: 'Daply/DELETE_DAPLY_SUCCESS',
    FAIL: 'Daply/DELETE_DAPLY_FAIL',
  },
  DELETE_DAPLY_FAVORITE: {
    REQUEST: 'Daply/DELETE_DAPLY_FAVORITE_REQUEST',
    SUCCESS: 'Daply/DELETE_DAPLY_FAVORITE_SUCCESS',
    FAIL: 'Daply/DELETE_DAPLY_FAVORITE_FAIL',
  },
  POST_DAPLY_COMMENT: {
    REQUEST: 'Daply/POST_DAPLY_COMMENT_REQUEST',
    SUCCESS: 'Daply/POST_DAPLY_COMMENT_SUCCESS',
    FAIL: 'Daply/POST_DAPLY_COMMENT_FAIL',
  },
  DELETE_DAPLY_COMMENT: {
    REQUEST: 'Daply/DELETE_DAPLY_COMMENT_REQUEST',
    SUCCESS: 'Daply/DELETE_DAPLY_COMMENT_SUCCESS',
    FAIL: 'Daply/DELETE_DAPLY_COMMENT_FAIL',
  },
  SET_POSTING_DAPLY: 'Daply/SET_POSTING_DAPLY',
  SET_POSTING_PLAYLIST: 'Daply/SET_POSTING_PLAYLIST',
  INIT_DAPLY_LIST: 'Daply/INIT_DAPLY_LIST',
};

export const daplyActions = {
  getMyDaplyList: () => ({
    type: daplyActionTypes.GET_MY_DAPLY_LIST.REQUEST,
  }),
  refreshMyDaplyList: () => ({
    type: daplyActionTypes.REFRESH_MY_DAPLY_LIST.REQUEST,
  }),
  getDaplyList: (userId) => ({
    type: daplyActionTypes.GET_DAPLY_LIST.REQUEST,
    userId,
  }),
  getDaplyLikeList: (daplyId) => ({
    type: daplyActionTypes.GET_DAPLY_LIKE_LIST.REQUEST,
    daplyId,
  }),
  refreshDaplyList: (userId) => ({
    type: daplyActionTypes.REFRESH_DAPLY_LIST.REQUEST,
    userId,
  }),
  getDaply: (daplyId) => ({
    type: daplyActionTypes.GET_DAPLY.REQUEST,
    daplyId,
  }),
  getDaplyComment: (daplyId) => ({
    type: daplyActionTypes.GET_DAPLY_COMMENT.REQUEST,
    daplyId,
  }),
  postDaply: (categoryList) => ({
    type: daplyActionTypes.POST_DAPLY.REQUEST,
    categoryList,
  }),
  postDaplyLike: (daplyId) => ({
    type: daplyActionTypes.POST_DAPLY_LIKE.REQUEST,
    daplyId,
  }),
  deleteDaplyLike: (daplyId) => ({
    type: daplyActionTypes.DELETE_DAPLY_LIKE.REQUEST,
    daplyId,
  }),
  deleteDaply: (daplyId) => ({
    type: daplyActionTypes.DELETE_DAPLY.REQUEST,
    daplyId,
  }),
  setPostingDaply: (postingDaply) => ({
    type: daplyActionTypes.SET_POSTING_DAPLY,
    postingDaply,
  }),
  postDaplyComment: ({ daplyId, content }) => ({
    type: daplyActionTypes.POST_DAPLY_COMMENT.REQUEST,
    daplyId,
    content,
  }),
  deleteDaplyComment: ({ commentId, daplyId }) => ({
    type: daplyActionTypes.DELETE_DAPLY_COMMENT.REQUEST,
    commentId,
    daplyId,
  }),
  setPostingPlayList: (postingPlayList) => ({
    type: daplyActionTypes.SET_POSTING_PLAYLIST,
    postingPlayList,
  }),
  getDaplyListByCategory: (category) => ({
    type: daplyActionTypes.GET_DAPLY_LIST_BY_CATEGORY.REQUEST,
    category,
  }),
  postDaplyFavorite: (daplyId) => ({
    type: daplyActionTypes.POST_DAPLY_FAVORITE.REQUEST,
    daplyId,
  }),
  deleteDaplyFavorite: (daplyId) => ({
    type: daplyActionTypes.DELETE_DAPLY_FAVORITE.REQUEST,
    daplyId,
  }),
  initDaplyList: () => ({
    type: daplyActionTypes.INIT_DAPLY_LIST,
  }),
};

export default daplyActionTypes;
