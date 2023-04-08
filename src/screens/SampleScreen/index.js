import React from 'react';
import { Text } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { MainWrapper } from '../../styles/main';

const SampleScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const dispatch = useDispatch();

  return (
    <MainWrapper>
      <Text>Sample</Text>
    </MainWrapper>
  );
};

export default SampleScreen;
