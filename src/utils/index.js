import { Alert } from 'react-native';
import feelingConfig from '../screens/Post/FeelingScreen/constants';

export const imagePickerOptions = {
  width: 400,
  height: 400,
  mediaType: 'photo',
  cropping: true,
  loadingLabelText: '처리중',
  cropperCancelText: '취소',
  cropperChooseText: '선택',
};

export const keyboardScrollConfig = {
  keyboardDismissMode: 'on-drag',
  keyboardShouldPersisTaps: 'handled',
  showsVerticalScrollIndicator: false,
  enableResetScrollToCoords: false,
};

export const isEmpty = function (value) {
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === 'object' && !Object.keys(value).length)
  ) {
    return true;
  }
  return false;
};

export function truncate(str, n) {
  return str.length > n ? `${str.substr(0, n - 1)}...` : str;
}

export function msToTime(s) {
  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;

  return `${mins}:${secs}`;
}

export function formatPhone(value) {
  if (!value) return '';
  const insertDash = (number) =>
    `${number.substring(0, 3)}-${number.substring(3, 7)}-${number.substring(
      7,
      11,
    )}`;

  if (value[0] === '8') {
    const removed82 = value.substring(1, value.length - 1);
    return insertDash(removed82);
  }

  return insertDash(value);
}

export const confirmAlert = ({ title, message, onConfirm, onCancel }) => {
  Alert.alert(title, message, [
    {
      text: '취소',
      onPress: onCancel(),
      style: 'cancel',
    },
    { text: '확인', onPress: onConfirm },
  ]);
};

export const findTargetFeelingObj = (value) => {
  const target = feelingConfig.find((x) => x.value === value);
  return target;
};
