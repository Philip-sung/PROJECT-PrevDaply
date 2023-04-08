/*
 * Date reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import daplyActionTypes from '.';
import { emptyPlayList } from '../../screens/DaplyPost/DaplyInitScreen/constants';

// The initial state of the App
export const initialState = {
  refreshingMyDaply: false,
  refreshingDaply: false,
  myDaplyListLoading: false,
  myDaplyList: [],
  daplyList: [],
  daplyListLoading: false,
  daplyDetail: {
    id: null,
    title: '',
    creator: {
      id: null,
      nickname: '',
      profileImg: '',
    },
    hasLiked: false,
    likeCount: 0,
    viewCount: 0,
    favoriteCount: 0,
    commentCount: 0,
    datePlayListComment: [],
    dateList: [],
    hasAdded: false,
  },
  daplyDetailLoading: false,
  daplyLike: [],
  daplyLikeLoading: false,
  postingDaply: {
    title: '',
  },
  postingPlayList: emptyPlayList,
  commentCount: 0,
  commentList: [],
  postLoading: false,
  daplyUpdateLoading: false,
  deleteLoading: false,
  getCommentLoading: false,
  postCommentLoading: false,
  deleteCommentLoading: false,
  daplyListByCategory: [],
  daplyListByCategoryLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const daplyReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case daplyActionTypes.GET_MY_DAPLY_LIST.REQUEST:
        draft.myDaplyListLoading = true;
        break;

      case daplyActionTypes.GET_MY_DAPLY_LIST.SUCCESS:
        draft.myDaplyListLoading = false;
        draft.myDaplyList = action.myDaplyList;
        break;

      case daplyActionTypes.GET_MY_DAPLY_LIST.FAIL:
        draft.myDaplyListLoading = false;
        break;

      case daplyActionTypes.REFRESH_MY_DAPLY_LIST.REQUEST:
        draft.refreshingMyDaply = true;
        break;

      case daplyActionTypes.REFRESH_MY_DAPLY_LIST.SUCCESS:
        draft.refreshingMyDaply = false;
        draft.myDaplyList = action.myDaplyList;
        break;

      case daplyActionTypes.REFRESH_MY_DAPLY_LIST.FAIL:
        draft.refreshingMyDaply = false;
        break;

      case daplyActionTypes.GET_DAPLY_LIST.REQUEST:
        draft.daplyListLoading = true;
        break;

      case daplyActionTypes.GET_DAPLY_LIST.SUCCESS:
        draft.daplyListLoading = false;
        draft.daplyList = action.daplyList;
        break;

      case daplyActionTypes.GET_DAPLY_LIST.FAIL:
        draft.daplyListLoading = false;
        break;

      case daplyActionTypes.GET_DAPLY_LIKE_LIST.REQUEST:
        draft.daplyLikeLoading = true;
        break;

      case daplyActionTypes.GET_DAPLY_LIKE_LIST.SUCCESS:
        draft.daplyLike = action.daplyLike;
        draft.daplyLikeLoading = false;
        break;

      case daplyActionTypes.GET_DAPLY_LIKE_LIST.FAIL:
        draft.daplyLikeLoading = false;
        break;

      case daplyActionTypes.REFRESH_DAPLY_LIST.REQUEST:
        draft.refreshingDaply = true;
        break;

      case daplyActionTypes.REFRESH_DAPLY_LIST.SUCCESS:
        draft.refreshingDaply = false;
        draft.daplyList = action.daplyList;
        break;

      case daplyActionTypes.REFRESH_DAPLY_LIST.FAIL:
        draft.refreshingDaply = false;
        break;

      case daplyActionTypes.SET_POSTING_DAPLY:
        draft.postingDaply = { ...draft.postingDaply, ...action.postingDaply };
        break;

      case daplyActionTypes.GET_DAPLY.REQUEST:
        draft.daplyDetailLoading = true;
        break;
      case daplyActionTypes.GET_DAPLY.SUCCESS:
        draft.daplyDetail = action.daplyDetail;
        draft.daplyDetailLoading = false;
        break;
      case daplyActionTypes.GET_DAPLY.FAIL:
        draft.daplyDetailLoading = false;
        break;

      case daplyActionTypes.POST_DAPLY.REQUEST:
        draft.postLoading = true;
        break;
      case daplyActionTypes.POST_DAPLY.SUCCESS:
        draft.postLoading = false;
        draft.postingDaply = initialState.postingDaply;
        draft.postingPlayList = initialState.postingPlayList;
        break;
      case daplyActionTypes.POST_DAPLY.FAIL:
        draft.postLoading = false;
        break;
      case daplyActionTypes.POST_DAPLY_LIKE.REQUEST:
        draft.daplyDetail = {
          ...draft.daplyDetail,
          hasLiked: true,
          likeCount: draft.daplyDetail.likeCount + 1,
        };
        break;

      case daplyActionTypes.DELETE_DAPLY_LIKE.REQUEST:
        draft.daplyDetail = {
          ...draft.daplyDetail,
          hasLiked: false,
          likeCount: draft.daplyDetail.likeCount - 1,
        };
        break;

      case daplyActionTypes.POST_DAPLY_FAVORITE.REQUEST:
        draft.daplyDetail = {
          ...draft.daplyDetail,
          hasAdded: true,
          favoriteCount: draft.daplyDetail.favoriteCount + 1,
        };
        break;

      case daplyActionTypes.DELETE_DAPLY_FAVORITE.REQUEST:
        draft.daplyDetail = {
          ...draft.daplyDetail,
          hasAdded: false,
          favoriteCount: draft.daplyDetail.favoriteCount - 1,
        };
        break;

      case daplyActionTypes.DELETE_DAPLY.REQUEST:
        draft.deleteLoading = true;
        break;

      case daplyActionTypes.DELETE_DAPLY.SUCCESS:
        draft.deleteLoading = false;
        break;

      case daplyActionTypes.DELETE_DAPLY.FAIL:
        draft.deleteLoading = false;
        break;

      case daplyActionTypes.SET_POSTING_PLAYLIST:
        draft.postingPlayList = action.postingPlayList;
        break;

      case daplyActionTypes.GET_DAPLY_LIST_BY_CATEGORY.REQUEST:
        draft.daplyListByCategoryLoading = true;
        break;

      case daplyActionTypes.GET_DAPLY_LIST_BY_CATEGORY.SUCCESS:
        draft.daplyListByCategoryLoading = false;
        draft.daplyListByCategory = action.result;
        break;

      case daplyActionTypes.GET_DAPLY_LIST_BY_CATEGORY.FAIL:
        draft.daplyListByCategoryLoading = false;
        break;

      case daplyActionTypes.INIT_DAPLY_LIST:
        draft.daplyList = initialState.daplyList;
        break;
    }
  });

export default daplyReducer;
