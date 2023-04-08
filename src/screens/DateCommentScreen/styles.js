import { View, Colors } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import { COMMENT_INPUT_HEIGHT, paddingHorizontal } from '../../styles';

export const KeyboardWrapper = styled(View)`
  height: ${COMMENT_INPUT_HEIGHT}px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  /* padding: 10px 0px 10px ${paddingHorizontal}px; */
  border: 1px solid ${Colors.grey60};
  background-color: white;
`;
