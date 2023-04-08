const kakaoActionTypes = {
  GET_LOC: {
    REQUEST: 'Kakao/SEARCH_LOC_REQUEST',
    SUCCESS: 'Kakao/SEARCH_LOC_SUCCESS',
    FAIL: 'Kakao/SEARCH_LOC_FAIL',
  },
};

export const kakaoActions = {
  searchLocAction: (query) => ({
    type: kakaoActionTypes.GET_LOC.REQUEST,
    query,
  }),
};

export default kakaoActionTypes;
