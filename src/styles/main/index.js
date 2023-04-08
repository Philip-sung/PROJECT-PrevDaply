import styled from 'styled-components/native';

import { KeyboardAwareScrollView, View } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native';
import {
  mainPaddingHorizontal,
  mainPaddingVertical,
  paddingHorizontal,
  paddingVertical,
  screenWidth,
  wp,
} from '..';

export const MainWrapper = styled(SafeAreaView)`
  padding: ${paddingVertical}px ${paddingHorizontal}px 0px
    ${paddingHorizontal}px;
`;

export const Wrapper = styled(View)`
  flex: 1;
  padding: ${mainPaddingVertical}px ${mainPaddingHorizontal}px 0px
    ${mainPaddingHorizontal}px;
  background-color: white;
`;

export const OverflowWrapper = styled(KeyboardAwareScrollView)`
  flex: 1;
  padding: ${mainPaddingVertical}px ${mainPaddingHorizontal}px 0px
    ${mainPaddingHorizontal}px;
`;

export const Header = styled.View`
  width: 100%;
  padding: 0px ${paddingHorizontal}px 0px ${paddingHorizontal}px;
`;

export const HeaderTitleWrapper = styled.View`
  padding: ${paddingVertical}px ${paddingHorizontal}px 0px
    ${paddingHorizontal}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: ${wp('3%')}px;
  line-height: 30px;
`;
