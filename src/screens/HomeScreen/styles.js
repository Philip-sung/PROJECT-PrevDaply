import { View } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import { colorTheme } from '../../styles';

export const BellActiveDot = styled(View)`
  position: absolute;
  top: -6px;
  right: -1px;
  border-radius: 7px;
  width: 14px;
  height: 14px;
  background-color: ${colorTheme.primary[300]};
`;
