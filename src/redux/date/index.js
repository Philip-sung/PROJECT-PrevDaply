const dateActionTypes = {
  GET_MY_DATE_LIST: {
    REQUEST: 'Date/GET_MY_DATE_LIST_REQUEST',
    SUCCESS: 'Date/GET_MY_DATE_LIST_SUCCESS',
    FAIL: 'Date/GET_MY_DATE_LIST_FAIL',
  },
  REFRESH_MY_DATE_LIST: {
    REQUEST: 'Date/REFRESH_MY_DATE_LIST_REQUEST',
    SUCCESS: 'Date/REFRESH_MY_DATE_LIST_SUCCESS',
    FAIL: 'Date/REFRESH_My_DATE_LIST_FAIL',
  },
  GET_DATE_LIST: {
    REQUEST: 'Date/GET_DATE_LIST_REQUEST',
    SUCCESS: 'Date/GET_DATE_LIST_SUCCESS',
    FAIL: 'Date/GET_DATE_LIST_FAIL',
  },
  GET_DATE_LIKE_LIST: {
    REQUEST: 'Date/GET_DATE_LIKE_LIST_REQUEST',
    SUCCESS: 'Date/GET_DATE_LIKE_LIST_SUCCESS',
    FAIL: 'Date/GET_DATE_LIKE_LIST_FAIL',
  },
  REFRESH_DATE_LIST: {
    REQUEST: 'Date/REFRESH_DATE_LIST_REQUEST',
    SUCCESS: 'Date/REFRESH_DATE_LIST_SUCCESS',
    FAIL: 'Date/REFRESH_DATE_LIST_FAIL',
  },
  GET_GROUP_LIST: {
    REQUEST: 'Date/GET_GROUP_LIST_REQUEST',
    SUCCESS: 'Date/GET_GROUP_LIST_SUCCESS',
    FAIL: 'Date/GET_GROUP_LIST_FAIL',
  },
  GET_SUB_GROUP_LIST: {
    REQUEST: 'Date/GET_SUB_GROUP_LIST_REQUEST',
    SUCCESS: 'Date/GET_SUB_GROUP_LIST_SUCCESS',
    FAIL: 'Date/GET_SUB_GROUP_LIST_FAIL',
  },
  GET_DATE_FEATURE_LIST: {
    REQUEST: 'Date/GET_DATE_FEATURE_LIST_REQUEST',
    SUCCESS: 'Date/GET_DATE_FEATURE_LIST_SUCCESS',
    FAIL: 'Date/GET_DATE_FEATURE_LIST_FAIL',
  },
  GET_DATE: {
    REQUEST: 'Date/GET_DATE_REQUEST',
    SUCCESS: 'Date/GET_DATE_SUCCESS',
    FAIL: 'Date/GET_DATE_FAIL',
  },
  GET_DATE_COMMENT: {
    REQUEST: 'Date/GET_DATE_COMMENT_REQUEST',
    SUCCESS: 'Date/GET_DATE_COMMENT_SUCCESS',
    FAIL: 'Date/GET_DATE_COMMENT_FAIL',
  },
  GET_FEELING_DETAIL: {
    REQUEST: 'Date/GET_FEELING_DETAIL_REQUEST',
    SUCCESS: 'Date/GET_FEELING_DETAIL_SUCCESS',
    FAIL: 'Date/GET_FEELING_DETAIL_FAIL',
  },
  POST_DATE: {
    REQUEST: 'Date/POST_DATE_REQUEST',
    SUCCESS: 'Date/POST_DATE_SUCCESS',
    FAIL: 'Date/POST_DATE_FAIL',
  },
  POST_DATE_LIKE: {
    REQUEST: 'Date/POST_DATE_LIKE_REQUEST',
    SUCCESS: 'Date/POST_DATE_LIKE_SUCCESS',
    FAIL: 'Date/POST_DATE_LIKE_FAIL',
  },
  DELETE_DATE_LIKE: {
    REQUEST: 'Date/DELETE_DATE_LIKE_REQUEST',
    SUCCESS: 'Date/DELETE_DATE_LIKE_SUCCESS',
    FAIL: 'Date/DELETE_DATE_LIKE_FAIL',
  },
  UPDATE_REVIEW: {
    REQUEST: 'Date/UPDATE_REVIEW_REQUEST',
    SUCCESS: 'Date/UPDATE_REVIEW_SUCCESS',
    FAIL: 'Date/UPDATE_REVIEW_FAIL',
  },
  UPDATE_REVIEW_IMG: {
    REQUEST: 'Date/UPDATE_REVIEW_IMG_REQUEST',
    SUCCESS: 'Date/UPDATE_REVIEW_IMG_SUCCESS',
    FAIL: 'Date/UPDATE_REVIEW_IMG_FAIL',
  },
  DELETE_POST: {
    REQUEST: 'Date/DELETE_POST_REQUEST',
    SUCCESS: 'Date/DELETE_POST_SUCCESS',
    FAIL: 'Date/DELETE_POST_FAIL',
  },
  POST_DATE_COMMENT: {
    REQUEST: 'Date/POST_DATE_COMMENT_REQUEST',
    SUCCESS: 'Date/POST_DATE_COMMENT_SUCCESS',
    FAIL: 'Date/POST_DATE_COMMENT_FAIL',
  },
  DELETE_DATE_COMMENT: {
    REQUEST: 'Date/DELETE_DATE_COMMENT_REQUEST',
    SUCCESS: 'Date/DELETE_DATE_COMMENT_SUCCESS',
    FAIL: 'Date/DELETE_DATE_COMMENT_FAIL',
  },
  POST_DATE_FAVORITE: {
    REQUEST: 'Date/POST_DATE_FAVORITE_REQUEST',
    SUCCESS: 'Date/POST_DATE_FAVORITE_SUCCESS',
    FAIL: 'Date/POST_DATE_FAVORITE_FAIL',
  },
  DELETE_DATE_FAVORITE: {
    REQUEST: 'Date/DELETE_DATE_FAVORITE_REQUEST',
    SUCCESS: 'Date/DELETE_DATE_FAVORITE_SUCCESS',
    FAIL: 'Date/DELETE_DATE_FAVORITE_FAIL',
  },
  GET_DATE_LIST_BY_THEME: {
    REQUEST: 'Date/GET_DATE_LIST_BY_THEME_REQUEST',
    SUCCESS: 'Date/GET_DATE_LIST_BY_THEME_SUCCESS',
    FAIL: 'Date/GET_DATE_LIST_BY_THEME_FAIL',
  },
  GET_THEME_LIST: {
    REQUEST: 'Date/GET_THEME_LIST_REQUEST',
    SUCCESS: 'Date/GET_THEME_LIST_SUCCESS',
    FAIL: 'Date/GET_THEME_LIST_FAIL',
  },
  SET_POSTING_DATE: 'Date/SET_POSTING_DATE',
  SET_FEATURE_LIST: 'Date/SET_FEATURE_LIST',
  SET_CONSTANT_FEATURE_LIST: 'DATE/SET_CONSTANT_FEATURE_LIST',
  INIT_POSTING_DATE: 'Date/INIT_POSTING_DATE',
  INIT_DATE_LIST: 'Date/INIT_DATE_LIST',
};

export const dateActions = {
  getMyDateList: () => ({
    type: dateActionTypes.GET_MY_DATE_LIST.REQUEST,
  }),
  refreshMyDateList: () => ({
    type: dateActionTypes.REFRESH_MY_DATE_LIST.REQUEST,
  }),
  getDateList: (userId) => ({
    type: dateActionTypes.GET_DATE_LIST.REQUEST,
    userId,
  }),
  getDateLikeList: (dateId) => ({
    type: dateActionTypes.GET_DATE_LIKE_LIST.REQUEST,
    dateId,
  }),
  refreshDateList: (userId) => ({
    type: dateActionTypes.REFRESH_DATE_LIST.REQUEST,
    userId,
  }),
  getDate: (dateId) => ({
    type: dateActionTypes.GET_DATE.REQUEST,
    dateId,
  }),
  getDateComment: (dateId) => ({
    type: dateActionTypes.GET_DATE_COMMENT.REQUEST,
    dateId,
  }),
  postDate: () => ({
    type: dateActionTypes.POST_DATE.REQUEST,
  }),
  postDateLike: (dateId) => ({
    type: dateActionTypes.POST_DATE_LIKE.REQUEST,
    dateId,
  }),
  deleteDateLike: (dateId) => ({
    type: dateActionTypes.DELETE_DATE_LIKE.REQUEST,
    dateId,
  }),
  deleteDate: (dateId) => ({
    type: dateActionTypes.DELETE_POST.REQUEST,
    dateId,
  }),
  updateReview: ({ reviewId, content, imageList }) => ({
    type: dateActionTypes.UPDATE_REVIEW.REQUEST,
    reviewId,
    content,
    imageList,
  }),
  updateReviewImg: ({ reviewId, imageList }) => ({
    type: dateActionTypes.UPDATE_REVIEW_IMG.REQUEST,
    reviewId,
    imageList,
  }),
  setPostingDate: (postingDate) => ({
    type: dateActionTypes.SET_POSTING_DATE,
    postingDate,
  }),
  getGroupList: () => ({
    type: dateActionTypes.GET_GROUP_LIST.REQUEST,
  }),
  getSubGroupList: ({ location }) => ({
    type: dateActionTypes.GET_SUB_GROUP_LIST.REQUEST,
    location,
  }),
  getDateFeatureList: (dateSubGroupId) => ({
    type: dateActionTypes.GET_DATE_FEATURE_LIST.REQUEST,
    dateSubGroupId,
  }),
  getFeelingDetail: (feelingType) => ({
    type: dateActionTypes.GET_FEELING_DETAIL.REQUEST,
    feelingType,
  }),
  getDateListByTheme: (theme) => ({
    type: dateActionTypes.GET_DATE_LIST_BY_THEME.REQUEST,
    theme,
  }),
  getThemeList: ({ isAll }) => ({
    type: dateActionTypes.GET_THEME_LIST.REQUEST,
    isAll,
  }),
  setFeatureList: (featureList) => ({
    type: dateActionTypes.SET_FEATURE_LIST,
    featureList,
  }),
  setConstantFeatureList: (constantFeatureList) => ({
    type: dateActionTypes.SET_CONSTANT_FEATURE_LIST,
    constantFeatureList,
  }),
  postDateComment: ({ dateId, content, parsedComment, mentionList }) => ({
    type: dateActionTypes.POST_DATE_COMMENT.REQUEST,
    dateId,
    content,
    parsedComment,
    mentionList,
  }),
  deleteDateComment: ({ commentId, dateId }) => ({
    type: dateActionTypes.DELETE_DATE_COMMENT.REQUEST,
    commentId,
    dateId,
  }),
  postDateFavorite: (dateId) => ({
    type: dateActionTypes.POST_DATE_FAVORITE.REQUEST,
    dateId,
  }),
  deleteDateFavorite: (dateId) => ({
    type: dateActionTypes.DELETE_DATE_FAVORITE.REQUEST,
    dateId,
  }),
  initPostingDate: () => ({
    type: dateActionTypes.INIT_POSTING_DATE,
  }),
  initDateList: () => ({
    type: dateActionTypes.INIT_DATE_LIST,
  }),
};

export default dateActionTypes;
