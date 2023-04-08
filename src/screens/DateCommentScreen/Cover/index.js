import moment from 'moment';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Text, View } from 'react-native-ui-lib';

import { HeaderContent, HeaderWrapper, Overlay } from './styles';

const Cover = ({ title, createdAt, mainImg, onPress }) => (
  <HeaderWrapper>
    <HeaderContent>
      <Text center text80BO color="white">
        {title}
      </Text>
      <Text text100L color="white">
        {moment(createdAt).format('YYYY.MM.DD HH:mm')}
      </Text>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          marginT-5
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 20,
            paddingHorizontal: 5,
          }}
        >
          <Text text100L white>
            본문으로
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </HeaderContent>
    <Overlay>
      <FastImage
        source={{
          uri: mainImg,
        }}
        style={{ flex: 1 }}
      />
    </Overlay>
  </HeaderWrapper>
);

export default Cover;
