import React, { memo } from 'react';

import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { Colors } from 'react-native-ui-lib';
import Pinchable from 'react-native-pinchable';
import { ImageWrapper } from './styles';
import { borderRadius } from '../../styles';

const DateImageSlider = memo(({ list }) => (
  <Pinchable>
    <ImageWrapper>
      <Swiper
        activeDotColor={Colors.point}
        removeClippedSubviews={false}
        loop={false}
        paginationStyle={{ bottom: -25 }}
      >
        {list.map((y) => (
          <FastImage
            key={`reviewImage-${y.id}`}
            source={{
              uri: y.imageUrl,
            }}
            style={{ flex: 1, borderRadius }}
          ></FastImage>
        ))}
      </Swiper>
    </ImageWrapper>
  </Pinchable>
));

export default DateImageSlider;
