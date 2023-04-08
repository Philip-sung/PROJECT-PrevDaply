import { TouchableOpacity } from 'react-native';
import { View, Colors } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import { colorTheme, hp, screenWidth, Touchable } from '../../styles';

const actionItemWidth = 56;

export const Wrapper = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const AddFav = styled(View)`
  left: ${screenWidth / 3 - actionItemWidth / 2}px;
  background-color: white;
  position: absolute;
  top: ${-(actionItemWidth / 2)}px;
  width: ${actionItemWidth}px;
  height: ${actionItemWidth}px;
  border-radius: ${actionItemWidth / 2}px;
  justify-content: center;
  align-items: center;
`;

export const Like = styled(TouchableOpacity)`
  left: ${screenWidth * (2 / 3) - actionItemWidth / 2}px;
  background-color: white;
  position: absolute;
  top: ${-(actionItemWidth / 2)}px;
  width: ${actionItemWidth}px;
  height: ${actionItemWidth}px;
  border-radius: ${actionItemWidth / 2}px;
  justify-content: center;
  align-items: center;
`;

export const ContentWrapper = styled(View)`
  padding: 20px;
`;

export const LocationWrapper = styled(Touchable)`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border: ${Colors.grey50} solid 1px;
  border-radius: 10px;
`;

export const KeyboardWrapper = styled(View)`
  height: 60px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px 0px 10px 20px;
  border: 1px solid ${Colors.grey60};
  background-color: white;
`;

export const LocationInfo = styled(View)`
  flex-direction: column;
  margin-left: 10px;
`;

export const ImageWrapper = styled(View)`
  width: 100%;
  aspect-ratio: 1;
`;

export const TagWrapper = styled(View)`
  border: ${colorTheme.primary[300]} 1px solid;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 2px 5px;
`;
