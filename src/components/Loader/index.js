import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { Dimensions, Platform, Text } from 'react-native';
import { View } from 'react-native-ui-lib';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { hp, wp } from '../../styles';

const LoadingWrapper = styled(View)`
  height: ${(props) => hp(`${props.height}%`)}px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

LoadingWrapper.defaultProps = {
  height: 80,
};

export const DateLoader = ({ wrapperHeight }) => (
  <LoadingWrapper height={wrapperHeight}>
    <LottieView
      source={require('../../assets/lottie/butterflyLoader.json')}
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
    />
  </LoadingWrapper>
);

export const WorldmapLoader = ({ wrapperHeight }) => (
  <LoadingWrapper height={wrapperHeight}>
    <LottieView
      source={require('../../assets/lottie/worldmapLoader.json')}
      autoPlay
      loop
      style={{ width: 150, height: 150 }}
    />
  </LoadingWrapper>
);

export const LocationLoader = ({ wrapperHeight }) => (
  <LoadingWrapper height={wrapperHeight}>
    <LottieView
      source={require('../../assets/lottie/locationPinLoader.json')}
      autoPlay
      loop
      style={{ width: 150, height: 150 }}
    />
  </LoadingWrapper>
);

export const UploadLoader = ({ wrapperHeight }) => (
  <LoadingWrapper height={wrapperHeight}>
    <LottieView
      source={require('../../assets/lottie/uploadLoader.json')}
      autoPlay
      loop
      style={{ width: 150, height: 150 }}
    />
  </LoadingWrapper>
);

export const CommentLoader = ({ wrapperHeight }) => (
  <LoadingWrapper height={wrapperHeight}>
    <LottieView
      source={require('../../assets/lottie/commentLoader.json')}
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
    />
  </LoadingWrapper>
);
