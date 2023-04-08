import { KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';

import { paddingHorizontal, paddingVertical } from '..';

export const AuthWrapper = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  padding: ${paddingVertical}px ${paddingHorizontal}px;
`;
