import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  Dimensions,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { Colors } from 'react-native-ui-lib';
const isIOS = Platform.OS === 'ios';

export const Touchable = isIOS ? TouchableOpacity : TouchableNativeFeedback;

export const paddingHorizontal = wp('5%');
export const paddingVertical = hp(isIOS ? '6%' : '2%');

export const mainPaddingHorizontal = wp('5%');
export const mainPaddingVertical = hp('2%');

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const borderRadius = 10;

export const COMMENT_INPUT_HEIGHT = 60;
export const COMMENT_INPUT_AVATAR_WIDTH = 35;

export const ListImageWidth = wp('10%');

export const bottomTabHeight = hp('8%');

export const shadowConfig = Platform.select({
  ios: {
    shadowColor: 'rgb(62, 69, 73)',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  android: {
    elevation: 3,
  },
});

const colorTheme = {
  primary: {
    100: '#FD8779',
    200: '#EF776F',
    300: '#FF6C85',
    400: '#A84257',
  },
  danger: {
    100: '#FF3600',
    200: '#D32E2E',
    300: '#7D0018',
  },
  gray: {
    100: '#8F877F',
    200: '#69625C',
    300: '#38302F',
  },
  secondary: {
    300: '#6c85ff',
  },
  text: '#282828',
};

export const top10Color = [Colors.yellow60, Colors.grey60, Colors.yellow50];

const navigationTheme = {
  dark: false,
  colors: {
    primary: colorTheme.primary[300],
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: colorTheme.danger[100],
  },
};

export const profileScrollViewConfig = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingBottom: 100,
  paddingHorizontal,
};

export const profileDaplyScrollViewConfig = {
  flexDirection: 'column',
  flexWrap: 'wrap',
  paddingBottom: 100,
  paddingHorizontal,
};

export { wp, hp, colorTheme, navigationTheme };
