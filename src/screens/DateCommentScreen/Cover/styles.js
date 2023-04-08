import { View } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import { hp, screenWidth } from '../../../styles';

const wrapperHeight = 100;

export const HeaderWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: black;
  width: ${screenWidth}px;
  height: ${wrapperHeight}px;
`;

export const Overlay = styled(View)`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.5;
  width: ${screenWidth}px;
  height: ${wrapperHeight}px;
  z-index: 0;
`;

export const HeaderTop = styled(View)`
  position: absolute;
  top: ${hp('5%')}px;
  z-index: 20;
`;
export const HeaderContent = styled(View)`
  position: absolute;
  left: 0;
  top: 0;
  padding: 0px 20px 0px 20px;
  justify-content: center;
  align-items: center;
  width: ${screenWidth}px;
  height: ${wrapperHeight}px;
  z-index: 1;
`;

export const Wrapper = styled(View)`
  justify-content: center;
  align-items: center;
`;
