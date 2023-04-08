import React, { memo, useState } from 'react';
import _ from 'lodash';

import { View, Button, Colors, Text } from 'react-native-ui-lib';

import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DotIndicator } from 'react-native-indicators';
import * as RootNavigation from '../../routes/navigation';
import { AddButon, Wrapper } from './styles';
import { borderRadius, colorTheme, shadowConfig } from '../../styles';
import { initImageLibrary } from '../../utils/image';
import { DateLoader } from '../Loader';

const ImageSlider = memo(({ list }) => (
  <Swiper
    activeDotColor={Colors.point}
    removeClippedSubviews={false}
    loop={false}
  >
    {_.sortBy(list, 'selectedIndex').map((y) => (
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        key={y.uri}
        style={{
          width: '100%',
          height: '100%',
          borderRadius,
        }}
        source={{
          uri: y.cropped ? y.cropped.path : y.uri,
        }}
      ></FastImage>
    ))}
  </Swiper>
));

const ImageUploader = ({ screen, imageList, selectionLimit, params }) => {
  const [assetsLoading, setAssestsLoading] = useState(false);
  const isEmpty = imageList.length === 0;
  const onClickEditPhoto = () => {
    RootNavigation.navigate('PhotoLibrary', {
      from: screen,
      imageList,
      extra: params,
    });
  };

  const onClickAddNewPhoto = () => {
    setAssestsLoading(true);
    initImageLibrary({
      screen,
      selectionLimit,
      callback: () => setAssestsLoading(false),
    });
  };

  return (
    <View>
      {!isEmpty ? (
        <View>
          <View style={{ aspectRatio: 1, width: '100%' }}>
            <ImageSlider list={imageList}></ImageSlider>
          </View>
          <View right marginT-10>
            <View row>
              <Button
                onPress={onClickAddNewPhoto}
                size="small"
                link
                label="새로 등록"
                grey40
                marginR-10
              ></Button>
              <Button
                onPress={onClickEditPhoto}
                label="수정"
                link
                size="small"
              ></Button>
            </View>
          </View>
        </View>
      ) : (
        <Wrapper style={{ aspectRatio: 1 }}>
          <View center flex>
            {assetsLoading ? (
              <>
                <DotIndicator
                  color={colorTheme.secondary[300]}
                  size={10}
                  count={3}
                ></DotIndicator>
              </>
            ) : (
              <AddButon
                onPress={onClickAddNewPhoto}
                style={{ ...shadowConfig }}
              >
                <AntDesign
                  name="plus"
                  size={24}
                  color={colorTheme.primary[300]}
                ></AntDesign>
              </AddButon>
            )}
          </View>
        </Wrapper>
      )}
    </View>
  );
};

export default ImageUploader;
