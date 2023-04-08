import moment from 'moment';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';

import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import Octicon from 'react-native-vector-icons/Octicons';

import { hp, Touchable } from '../../../styles';
import { HeaderContent, HeaderWrapper, Overlay } from './styles';

const Cover = ({
  title,
  createdAt,
  mainImg,
  likeCount,
  viewCount,
  onPressLikeCount,
}) => (
  <HeaderWrapper>
    <HeaderContent>
      <Text
        style={{
          fontFamily: 'GangwonEduSaeeum-OTFMedium',
        }}
        center
        text40
        color="white"
      >
        {title}
      </Text>
      <Text style={{ marginTop: hp('2%') }} text80L color="white">
        {moment(createdAt).format('YYYY.MM.DD HH:mm')}
      </Text>
      <View row marginT-10>
        <View row center marginR-15>
          <SimpleLine size={20} name="eye" color="white" />
          <Text text80L marginL-5 color="white">
            {viewCount}
          </Text>
        </View>
        <Touchable onPress={onPressLikeCount}>
          <View row center marginR-15>
            <SimpleLine size={20} name="heart" color="white" />
            <Text text80L marginL-5 color="white">
              {likeCount}
            </Text>
          </View>
        </Touchable>
      </View>
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
