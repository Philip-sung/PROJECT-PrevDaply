import { Colors, View } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import { borderRadius, wp } from '../../styles';

const mainPhotoItemWidth = wp('25%');

export const MainPhotoItem = styled(View)`
  width: ${mainPhotoItemWidth}px;
  height: ${mainPhotoItemWidth}px;
  border: 1px solid ${Colors.grey70};
  border-radius: ${borderRadius}px;
  justify-content: center;
  align-items: center;
`;
