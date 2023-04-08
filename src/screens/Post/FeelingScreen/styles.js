import { View, Colors } from 'react-native-ui-lib';

import styled from 'styled-components/native';
import { screenWidth } from '../../../styles';

const itemWidth = screenWidth / 4;

export const FeelingItem = styled(View)`
  border: 1px solid ${Colors.grey50};
  border-radius: 10px;
  width: ${itemWidth}px;
  height: ${itemWidth + 35}px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;
