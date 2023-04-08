const homeActionTypes = {
  GET_DATE_TOP: {
    REQUEST: 'Home/GET_DATE_TOP_REQUEST',
    SUCCESS: 'Home/GET_DATE_TOP_SUCCESS',
    FAIL: 'Home/GET_DATE_TOP_FAIL',
  },
  GET_DAPLY_TOP: {
    REQUEST: 'Home/GET_DAPLY_TOP_REQUEST',
    SUCCESS: 'Home/GET_DAPLY_TOP_SUCCESS',
    FAIL: 'Home/GET_DAPLY_TOP_FAIL',
  },
  GET_DATE_TOP_THEME: {
    REQUEST: 'Home/GET_DATE_TOP_THEME_REQUEST',
    SUCCESS: 'Home/GET_DATE_TOP_THEME_SUCCESS',
    FAIL: 'Home/GET_DATE_TOP_THEME_FAIL',
  },
  GET_DATE_BY_THEME: {
    REQUEST: 'Home/GET_DATE_BY_THEME_REQUEST',
    SUCCESS: 'Home/GET_DATE_BY_THEME_SUCCESS',
    FAIL: 'Home/GET_DATE_BY_THEME_FAIL',
  },
  GET_DATE_BY_FEELING: {
    REQUEST: 'Home/GET_DATE_BY_FEELING_REQUEST',
    SUCCESS: 'Home/GET_DATE_BY_FEELING_SUCCESS',
    FAIL: 'Home/GET_DATE_BY_FEELING_FAIL',
  },
  GET_FEED: {
    REQUEST: 'Home/GET_FEED_REQUEST',
    SUCCESS: 'Home/GET_FEED_SUCCESS',
    FAIL: 'Home/GET_FEED_FAIL',
  },
  GET_DAPLY_FEED: {
    REQUEST: 'Home/GET_DAPLY_FEED_REQUEST',
    SUCCESS: 'Home/GET_DAPLY_FEED_SUCCESS',
    FAIL: 'Home/GET_DAPLY_FEED_FAIL',
  },
  SET_DATE_THEME: 'Home/SET_DATE_THEME',
  SET_DATE_FEELING: 'Home/SET_DATE_FEELING',
  INIT: 'Home/INIT',
};

export const homeActions = {
  getDateTopAction: () => ({
    type: homeActionTypes.GET_DATE_TOP.REQUEST,
  }),
  getDaplyTopAction: () => ({
    type: homeActionTypes.GET_DAPLY_TOP.REQUEST,
  }),
  getFeedAction: () => ({
    type: homeActionTypes.GET_FEED.REQUEST,
  }),
  getDateTopThemeAction: ({ isAll }) => ({
    type: homeActionTypes.GET_DATE_TOP_THEME.REQUEST,
    isAll,
  }),
  getDateByThemeAction: (subGroupId) => ({
    type: homeActionTypes.GET_DATE_BY_THEME.REQUEST,
    subGroupId,
  }),
  getDateByFeelingAction: (feeling) => ({
    type: homeActionTypes.GET_DATE_BY_FEELING.REQUEST,
    feeling,
  }),
  getDaplyFeedAction: () => ({
    type: homeActionTypes.GET_DAPLY_FEED.REQUEST,
  }),
  setDateTheme: (subGroupId) => ({
    type: homeActionTypes.SET_DATE_THEME,
    subGroupId,
  }),
  setDateFeeling: (feeling) => ({
    type: homeActionTypes.SET_DATE_FEELING,
    feeling,
  }),
};

export default homeActionTypes;
