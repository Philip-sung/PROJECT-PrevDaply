import { Colors, View } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { colorTheme, screenHeight, screenWidth } from '../../styles';

const actionItemWidth = 56;

export const Wrapper = styled(View)`
  width: 100%;
  border: ${Colors.grey50} 1px solid;
  border-radius: 10px;
`;

export const AddButon = styled(TouchableOpacity)`
  background-color: white;
  width: ${actionItemWidth}px;
  height: ${actionItemWidth}px;
  border-radius: ${actionItemWidth / 2}px;
  justify-content: center;
  align-items: center;
`;
