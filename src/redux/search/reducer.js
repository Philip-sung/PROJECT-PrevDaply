/*
 * Home reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import searchActionTypes from '.';

// The initial state of the App
export const initialState = {
  collectionLoading: false,
  collectionList: [],
  searchLoading: false,
  searchResult: [],
};

/* eslint-disable default-case, no-param-reassign */
const searchReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case searchActionTypes.GET_COLLECTION.REQUEST:
        draft.collectionLoading = true;
        break;

      case searchActionTypes.GET_COLLECTION.SUCCESS:
        draft.collectionLoading = false;
        draft.collectionList = action.result;
        break;

      case searchActionTypes.GET_COLLECTION.FAIL:
        draft.collectionLoading = false;
        break;

      case searchActionTypes.GET_SEARCH.REQUEST:
        draft.searchLoading = true;
        break;

      case searchActionTypes.GET_SEARCH.SUCCESS:
        draft.searchLoading = false;
        draft.searchResult = action.result;
        break;

      case searchActionTypes.GET_SEARCH.FAIL:
        draft.searchLoading = false;
        break;

      case searchActionTypes.INIT:
        draft = initialState;
        break;
    }
  });

export default searchReducer;
