/*
 * Kakao reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import kakaoActionTypes from '.';

// The initial state of the App
export const initialState = {
  searchLoading: false,
  locationList: [{ id: -1 }],
};

/* eslint-disable default-case, no-param-reassign */
const kakaoReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case kakaoActionTypes.GET_LOC.REQUEST:
        draft.searchLoading = true;
        break;

      case kakaoActionTypes.GET_LOC.SUCCESS:
        draft.searchLoading = false;
        draft.locationList = [{ id: -1 }, ...action.locationList];
        break;

      case kakaoActionTypes.GET_LOC.FAIL:
        draft.searchLoading = false;
        break;
    }
  });

export default kakaoReducer;
