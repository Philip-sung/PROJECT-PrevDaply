import { Colors, View } from 'react-native-ui-lib';
import styled from 'styled-components/native';
import { borderRadius, wp } from '../../../styles';

const DateIndexLabelWidth = 26;

const mainPhotoItemWidth = wp('25%');

export const MainPhotoItem = styled(View)`
  width: ${mainPhotoItemWidth}px;
  height: ${mainPhotoItemWidth}px;
  border: 1px solid ${Colors.grey50};
  border-radius: ${borderRadius}px;
  justify-content: center;
  align-items: center;
`;

export const DateIndexLabel = styled(View)`
  position: absolute;
  top: -10px;
  left: -12px;
  width: ${DateIndexLabelWidth}px;
  height: ${DateIndexLabelWidth}px;
  border-radius: ${DateIndexLabelWidth / 2}px;
  background-color: ${Colors.point};
  opacity: 0.8;
`;
