import React, { memo } from 'react';
import { View, Text } from 'react-native-ui-lib';
import { AnimatedText } from '../../components/Animation';

export const ListHeader = memo((props) => (
  <View paddingV-30 marginB-10>
    <Text point>{props.title}</Text>
    <AnimatedText text50 marginB-10 animation="slideInDown">
      {props.subTitle}
    </AnimatedText>
  </View>
));
