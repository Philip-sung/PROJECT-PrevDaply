const notiActionTypes = {
  GET_NOTI_LIST: {
    REQUEST: 'Notification/GET_NOTI_LIST_REQUEST',
    SUCCESS: 'Notification/GET_NOTI_LIST_SUCCESS',
    FAIL: 'Notification/GET_NOTI_LIST_FAIL',
  },
  READ_NOTI: {
    REQUEST: 'Notification/READ_NOTI_REQUEST',
    SUCCESS: 'Notification/READ_NOTI_SUCCESS',
    FAIL: 'Notification/READ_NOTI_FAIL',
  },
};

export const notiActions = {
  getNotiList: () => ({
    type: notiActionTypes.GET_NOTI_LIST.REQUEST,
  }),
  readNoti: (notiId) => ({
    type: notiActionTypes.READ_NOTI.REQUEST,
    notiId,
  }),
};

export default notiActionTypes;
