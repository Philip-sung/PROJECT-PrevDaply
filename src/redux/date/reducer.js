/*
 * Date reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import dateActionTypes from '.';

// The initial state of the App
export const initialState = {
  refreshingMyDate: false,
  refreshingDate: false,
  myDateListLoading: false,
  myDateList: [],
  dateListLoading: false,
  dateList: [],
  dateLikeList: [],
  dateLikeListLoading: false,
  postingDate: {
    location: {
      address_name: '',
      category_group_code: '',
      category_group_name: '',
      category_name: '',
      distance: '',
      id: null,
      phone: '',
      place_name: '',
      place_url: '',
      road_address_name: '',
      x: '',
      y: '',
    },
    contactList: [],
    title: '',
    mainImg: null,
    feeling: {
      id: null,
      value: '',
      label: '',
    },
  },
  groupList: [],
  groupLoading: false,
  subGroupList: [],
  subGroupLoading: false,
  featureList: [],
  featureListLoading: true,
  constantFeatureList: [],
  activeFeature: {
    id: null,
    question: '',
    order: 0,
  },
  date: {
    id: null,
    creatorId: null,
    title: '',
    kakaoLocId: null,
    mainImg: null,
    dateSubGroupId: null,
    createdAt: new Date(),
    updatedAt: '',
    feeling: 'satisfied',
    creator: {
      id: null,
      nickname: '',
      profileImg: '',
    },
    creatorDateCount: 0,
    hasLiked: false,
    hadAdded: false,
    likeCount: 0,
    viewCount: 0,
    kakaoLocation: {
      id: null,
      kakaoId: '',
      category: '',
      addressName: '',
      roadAddressName: '',
      x: '',
      y: '',
      phone: '',
      placeName: '',
      placeUrl: '',
    },
    dateReview: [],
    dateUserMap: [],
    dateComment: [],
    dateSubGroup: {
      id: null,
      name: '',
    },
  },
  commentCount: 0,
  commentList: [],
  dateLoading: false,
  postLoading: false,
  updateLoading: false,
  deleteLoading: false,
  getCommentLoading: false,
  postCommentLoading: false,
  deleteCommentLoading: false,
  dateFeelingCover: null,
  dateFeelingList: [],
  dateFeelingLoading: false,
  dateListByTheme: [],
  dateListByThemeLoading: false,
  themeList: [],
  themeListLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const dateReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case dateActionTypes.GET_MY_DATE_LIST.REQUEST:
        draft.myDateListLoading = true;
        break;

      case dateActionTypes.GET_MY_DATE_LIST.SUCCESS:
        draft.myDateListLoading = false;
        draft.myDateList = action.myDateList;
        break;

      case dateActionTypes.GET_MY_DATE_LIST.FAIL:
        draft.myDateListLoading = false;
        break;

      case dateActionTypes.REFRESH_MY_DATE_LIST.REQUEST:
        draft.refreshingMyDate = true;
        break;

      case dateActionTypes.REFRESH_MY_DATE_LIST.SUCCESS:
        draft.refreshingMyDate = false;
        draft.myDateList = action.myDateList;
        break;

      case dateActionTypes.REFRESH_MY_DATE_LIST.FAIL:
        draft.refreshingMyDate = false;
        break;

      case dateActionTypes.GET_DATE_LIST.REQUEST:
        draft.dateListLoading = true;
        break;

      case dateActionTypes.GET_DATE_LIST.SUCCESS:
        draft.dateListLoading = false;
        draft.dateList = action.dateList;
        break;

      case dateActionTypes.GET_DATE_LIST.FAIL:
        draft.dateListLoading = false;
        break;

      case dateActionTypes.GET_DATE_LIKE_LIST.REQUEST:
        draft.dateLikeListLoading = true;
        break;

      case dateActionTypes.GET_DATE_LIKE_LIST.SUCCESS:
        draft.dateLikeList = action.dateLikeList;
        draft.dateLikeListLoading = false;
        break;

      case dateActionTypes.GET_DATE_LIKE_LIST.FAIL:
        draft.dateLikeListLoading = false;
        break;

      case dateActionTypes.REFRESH_DATE_LIST.REQUEST:
        draft.refreshingDate = true;
        break;

      case dateActionTypes.REFRESH_DATE_LIST.SUCCESS:
        draft.refreshingDate = false;
        draft.dateList = action.dateList;
        break;

      case dateActionTypes.REFRESH_DATE_LIST.FAIL:
        draft.refreshingDate = false;
        break;

      case dateActionTypes.GET_GROUP_LIST.REQUEST:
        draft.groupLoading = true;
        break;

      case dateActionTypes.GET_GROUP_LIST.SUCCESS:
        draft.groupLoading = false;
        draft.groupList = action.groupList;
        break;

      case dateActionTypes.GET_GROUP_LIST.FAIL:
        draft.groupLoading = false;
        break;

      case dateActionTypes.GET_SUB_GROUP_LIST.REQUEST:
        draft.subGroupLoading = true;
        break;

      case dateActionTypes.GET_SUB_GROUP_LIST.SUCCESS:
        draft.subGroupLoading = false;
        draft.subGroupList = action.subGroupList;
        break;

      case dateActionTypes.GET_SUB_GROUP_LIST.FAIL:
        draft.subGroupLoading = false;
        break;

      case dateActionTypes.SET_POSTING_DATE:
        draft.postingDate = { ...draft.postingDate, ...action.postingDate };
        break;

      case dateActionTypes.GET_DATE_FEATURE_LIST.REQUEST:
        draft.featureListLoading = true;
        break;
      case dateActionTypes.GET_DATE_FEATURE_LIST.SUCCESS:
        draft.featureList = action.featureList;
        draft.constantFeatureList = action.featureList;
        draft.featureListLoading = false;
        break;
      case dateActionTypes.GET_DATE.REQUEST:
        draft.dateLoading = true;
        break;
      case dateActionTypes.GET_DATE.SUCCESS:
        draft.date = action.date;
        draft.dateLoading = false;
        break;
      case dateActionTypes.GET_DATE.FAIL:
        draft.dateLoading = false;
        break;
      case dateActionTypes.GET_DATE_FEATURE_LIST.FAIL:
        draft.featureListLoading = false;
        break;
      case dateActionTypes.SET_FEATURE_LIST:
        draft.featureList = action.featureList;
        break;

      case dateActionTypes.SET_CONSTANT_FEATURE_LIST:
        draft.constantFeatureList = action.constantFeatureList;
        break;

      case dateActionTypes.POST_DATE.REQUEST:
        draft.postLoading = true;
        break;
      case dateActionTypes.POST_DATE.SUCCESS:
        draft.postLoading = false;
        draft.postingDate = initialState.postingDate;
        draft.featureList = [];
        draft.constantFeatureList = [];
        break;
      case dateActionTypes.POST_DATE.FAIL:
        draft.postLoading = false;
        break;

      case dateActionTypes.UPDATE_REVIEW.REQUEST:
        draft.updateLoading = true;
        break;

      case dateActionTypes.UPDATE_REVIEW.SUCCESS:
        draft.updateLoading = false;
        break;

      case dateActionTypes.UPDATE_REVIEW.FAIL:
        draft.updateLoading = false;
        break;

      case dateActionTypes.POST_DATE_LIKE.REQUEST:
        draft.date = {
          ...draft.date,
          hasLiked: true,
          likeCount: draft.date.likeCount + 1,
        };
        break;

      case dateActionTypes.POST_DATE_FAVORITE.REQUEST:
        draft.date = {
          ...draft.date,
          hasAdded: true,
        };
        break;

      case dateActionTypes.DELETE_DATE_LIKE.REQUEST:
        draft.date = {
          ...draft.date,
          hasLiked: false,
          likeCount: draft.date.likeCount - 1,
        };
        break;

      case dateActionTypes.DELETE_DATE_FAVORITE.REQUEST:
        draft.date = {
          ...draft.date,
          hasAdded: false,
        };
        break;

      case dateActionTypes.DELETE_POST.REQUEST:
        draft.deleteLoading = true;
        break;

      case dateActionTypes.DELETE_POST.SUCCESS:
        draft.deleteLoading = false;
        break;

      case dateActionTypes.DELETE_POST.FAIL:
        draft.deleteLoading = false;
        break;

      case dateActionTypes.POST_DATE_COMMENT.REQUEST:
        draft.postCommentLoading = true;
        break;

      case dateActionTypes.POST_DATE_COMMENT.SUCCESS:
        draft.date = {
          ...draft.date,
          commentCount: draft.date.commentCount + 1,
          dateComment: [action.comment, ...draft.date.dateComment].slice(0, 2),
        };
        draft.postCommentLoading = false;
        draft.commentList = [action.comment, ...draft.commentList];
        break;

      case dateActionTypes.DELETE_DATE_COMMENT.REQUEST:
        draft.deleteCommentLoading = true;
        break;

      case dateActionTypes.DELETE_DATE_COMMENT.SUCCESS:
        draft.date = {
          ...draft.date,
          commentCount: draft.date.commentCount - 1,
          dateComment: action.dateComment,
        };
        draft.deleteCommentLoading = false;
        draft.commentList = action.commentList;
        break;

      case dateActionTypes.POST_DATE_COMMENT.FAIL:
        draft.postCommentLoading = false;
        break;

      case dateActionTypes.GET_DATE_COMMENT.REQUEST:
        draft.getCommentLoading = true;
        break;

      case dateActionTypes.GET_DATE_COMMENT.SUCCESS:
        draft.getCommentLoading = false;
        draft.commentList = action.commentList;
        break;

      case dateActionTypes.GET_DATE_COMMENT.FAIL:
        draft.getCommentLoading = false;
        break;

      case dateActionTypes.INIT_POSTING_DATE:
        draft.postingDate = initialState.postingDate;
        draft.featureList = [];
        draft.constantFeatureList = [];
        break;

      case dateActionTypes.GET_FEELING_DETAIL.REQUEST:
        draft.dateFeelingLoading = true;
        break;

      case dateActionTypes.GET_FEELING_DETAIL.SUCCESS:
        draft.dateFeelingLoading = false;
        draft.dateFeelingList = action.result;
        draft.dateFeelingCover = action.coverImg;
        break;

      case dateActionTypes.GET_FEELING_DETAIL.FAIL:
        draft.dateFeelingLoading = false;
        break;

      case dateActionTypes.GET_DATE_LIST_BY_THEME.REQUEST:
        draft.dateListByThemeLoading = true;
        break;

      case dateActionTypes.GET_DATE_LIST_BY_THEME.SUCCESS:
        draft.dateListByThemeLoading = false;
        draft.dateListByTheme = action.result;
        break;

      case dateActionTypes.GET_DATE_LIST_BY_THEME.FAIL:
        draft.dateListByThemeLoading = false;
        break;

      case dateActionTypes.GET_THEME_LIST.REQUEST:
        draft.themeListLoading = true;
        break;

      case dateActionTypes.GET_THEME_LIST.SUCCESS:
        draft.themeListLoading = false;
        draft.themeList = action.result;
        break;

      case dateActionTypes.GET_THEME_LIST.FAIL:
        draft.themeListLoading = false;
        break;

      case dateActionTypes.INIT_DATE_LIST:
        draft.dateList = initialState.dateList;
        break;
    }
  });

export default dateReducer;
