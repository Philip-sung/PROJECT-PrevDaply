/*
 * User reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import notiActionTypes from '.';

// The initial state of the App
export const initialState = {
  notiList: [],
  notiLoading: false,
  mainBellActive: false,
};

/* eslint-disable default-case, no-param-reassign */
const notiReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case notiActionTypes.GET_NOTI_LIST.REQUEST:
        draft.notiLoading = true;
        break;

      case notiActionTypes.GET_NOTI_LIST.SUCCESS:
        draft.notiLoading = false;
        draft.notiList = action.notiList;
        draft.mainBellActive = action.mainBellActive;
        break;

      case notiActionTypes.GET_NOTI_LIST.FAIL:
        draft.notiLoading = false;
        break;
    }
  });

export default notiReducer;
