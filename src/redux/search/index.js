const searchActionTypes = {
  GET_COLLECTION: {
    REQUEST: 'Search/GET_COLLECTION_REQUEST',
    SUCCESS: 'Search/GET_COLLECTION_SUCCESS',
    FAIL: 'Search/GET_COLLECTION_FAIL',
  },
  GET_SEARCH: {
    REQUEST: 'Search/GET_SEARCH_REQUEST',
    SUCCESS: 'Search/GET_SEARCH_SUCCESS',
    FAIL: 'Search/GET_SEARCH_FAIL',
  },
  INIT: 'Search/INIT',
};

export const searchActions = {
  getCollection: (word) => ({
    type: searchActionTypes.GET_COLLECTION.REQUEST,
    word,
  }),
  getSearch: (query) => ({
    type: searchActionTypes.GET_SEARCH.REQUEST,
    query,
  }),
};

export default searchActionTypes;
