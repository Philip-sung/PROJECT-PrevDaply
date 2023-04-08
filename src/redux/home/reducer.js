/*
 * Home reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import homeActionTypes from '.';
import feelingConfig from '../../screens/Post/FeelingScreen/constants';

// The initial state of the App
export const initialState = {
  dateTopLoading: false,
  dateTopList: [],
  daplyTopLoading: false,
  daplyTopList: [],
  feedList: [],
  feedLoading: false,
  dateTopThemeList: [],
  dateTopThemeLoading: false,
  activeDateTheme: null,
  activeDateFeeling: feelingConfig[0].value,
  dateListByTheme: [],
  dateListByThemeLoading: false,
  dateListByFeeling: [],
  dateListByFeelingLoading: false,
  daplyFeedList: [],
  daplyFeedLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case homeActionTypes.GET_DATE_TOP.REQUEST:
        draft.dateTopLoading = true;
        break;

      case homeActionTypes.GET_DATE_TOP.SUCCESS:
        draft.dateTopLoading = false;
        draft.dateTopList = action.result;
        break;

      case homeActionTypes.GET_DATE_TOP.FAIL:
        draft.dateTopLoading = false;
        break;

      case homeActionTypes.INIT:
        draft = initialState;
        break;

      case homeActionTypes.GET_DAPLY_TOP.REQUEST:
        draft.daplyTopLoading = true;
        break;

      case homeActionTypes.GET_DAPLY_TOP.SUCCESS:
        draft.daplyTopLoading = false;
        draft.daplyTopList = action.result;
        break;

      case homeActionTypes.GET_DAPLY_TOP.FAIL:
        draft.daplyTopLoading = false;
        break;

      case homeActionTypes.GET_FEED.REQUEST:
        draft.feedLoading = true;
        break;

      case homeActionTypes.GET_FEED.SUCCESS:
        draft.feedLoading = false;
        draft.feedList = action.feedList;
        break;

      case homeActionTypes.GET_FEED.FAIL:
        draft.feedLoading = false;
        break;

      case homeActionTypes.GET_DATE_TOP_THEME.REQUEST:
        draft.dateTopThemeLoading = true;
        break;

      case homeActionTypes.GET_DATE_TOP_THEME.SUCCESS:
        draft.dateTopThemeLoading = false;
        draft.dateTopThemeList = action.result;
        break;

      case homeActionTypes.GET_DATE_TOP_THEME.FAIL:
        draft.dateTopThemeLoading = false;
        break;

      case homeActionTypes.SET_DATE_THEME:
        draft.activeDateTheme = action.subGroupId;
        break;

      case homeActionTypes.SET_DATE_FEELING:
        draft.activeDateFeeling = action.feeling;
        break;

      case homeActionTypes.GET_DATE_BY_THEME.REQUEST:
        draft.dateListByThemeLoading = true;
        break;

      case homeActionTypes.GET_DATE_BY_THEME.SUCCESS:
        draft.dateListByThemeLoading = false;
        draft.dateListByTheme = action.result;
        break;

      case homeActionTypes.GET_DATE_BY_THEME.FAIL:
        draft.dateListByThemeLoading = false;
        break;

      case homeActionTypes.GET_DATE_BY_FEELING.REQUEST:
        draft.dateListByFeelingLoading = true;
        break;

      case homeActionTypes.GET_DATE_BY_FEELING.SUCCESS:
        draft.dateListByFeelingLoading = false;
        draft.dateListByFeeling = action.result;
        break;

      case homeActionTypes.GET_DATE_BY_FEELING.FAIL:
        draft.dateListByFeelingLoading = false;
        break;

      case homeActionTypes.GET_DAPLY_FEED.REQUEST:
        draft.daplyFeedLoading = true;
        break;

      case homeActionTypes.GET_DAPLY_FEED.SUCCESS:
        draft.daplyFeedLoading = false;
        draft.daplyFeedList = action.daplyFeedList;
        break;

      case homeActionTypes.GET_DAPLY_FEED.FAIL:
        draft.daplyFeedLoading = false;
        break;
    }
  });

export default homeReducer;
