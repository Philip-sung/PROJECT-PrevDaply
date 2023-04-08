import React from 'react';
import FastImage from 'react-native-fast-image';
import { View } from 'react-native-ui-lib';
import logo from '../../assets/icons/logo.png';
import { hp, wp } from '../../styles';

const TitleLogo = () => (
  <View paddingB-5>
    <FastImage source={logo} style={{ width: 80, height: 43 }}></FastImage>
  </View>
);

export default TitleLogo;
