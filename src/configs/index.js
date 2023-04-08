import { Platform } from 'react-native';

export const keyboardConfig = {
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
};

export const DAPLY_TITLE_LENGTH = 25;
export const DATE_TITLE_LENGTH = 50;
