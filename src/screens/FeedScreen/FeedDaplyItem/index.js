import React from 'react';
import FastImage from 'react-native-fast-image';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Octicon from 'react-native-vector-icons/Octicons';
import {
  borderRadius,
  paddingHorizontal,
  wp,
  Touchable,
  colorTheme,
} from '../../../styles';
import { parseLocation } from '../../../utils/location';

const imageWidth = wp('30%');
const dotWidth = 10;
const lineWidth = 0.6;

function FeedDaplyItem({ onPressProfile, daply, onPressDaply }) {
  return (
    <View
      style={{ borderBottomColor: Colors.grey60, borderBottomWidth: 1 }}
      paddingV-20
    >
      <View style={{ paddingHorizontal, paddingBottom: 10 }} row spread>
        <TouchableWithoutFeedback onPress={onPressProfile}>
          <View row>
            <FastImage
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: daply.creator.profileImg }}
            ></FastImage>
            <View marginL-10>
              <Text text80BO>{daply.creator.nickname}</Text>
              <Text text90L grey10>
                {daply.dateCount}번의 데이트
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Touchable onPress={onPressDaply}>
        <View flex row>
          <View padding-10 style={{ width: wp('60%') }} marginR-10>
            <View style={{ width: '100%', aspectRatio: 1 }}>
              <FastImage
                source={{ uri: daply.mainImg }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius,
                }}
              ></FastImage>
            </View>
            <View padding-5>
              <Text grey10 text80BO>
                {daply.title}
              </Text>
            </View>
            <View paddingH-5>
              <Text grey20 text90L>
                {parseLocation({
                  location: daply.dateList[0].date.kakaoLocation.addressName,
                  index: 1,
                })}{' '}
                외 {daply.dateList.length - 1} 곳
              </Text>
            </View>
          </View>
          <View style={{ width: wp('40%') }}>
            <View column>
              {daply.dateList.map((x, i) => {
                const isFirst = i === 0;
                const isEnd = i === daply.dateList.length - 1;
                const isMiddle = !isFirst && !isEnd;
                return (
                  <View key={`date-time-line-${x.id}`} row centerV>
                    <View
                      column
                      height={imageWidth}
                      bottom={isFirst}
                      marginR-20
                    >
                      <View
                        width={lineWidth}
                        height={isMiddle ? '100%' : '50%'}
                        backgroundColor={Colors.point}
                      ></View>
                      <View
                        backgroundColor={Colors.point}
                        style={{
                          width: dotWidth,
                          height: dotWidth,
                          borderRadius: dotWidth / 2,
                          position: 'absolute',
                          top: imageWidth / 2 - dotWidth,
                          right: -dotWidth / 2 + lineWidth / 2,
                        }}
                      ></View>
                    </View>
                    <View flex>
                      <View row centerV flex>
                        <FastImage
                          source={{ uri: x.date.mainImg }}
                          style={{
                            width: imageWidth - 10,
                            height: imageWidth - 10,
                            borderRadius,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        ></FastImage>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
            <View flex row center>
              <View row center marginR-10>
                <AntIcon
                  size={12}
                  name="heart"
                  color={colorTheme.primary[300]}
                />
                <Text text100L grey30 marginL-2>
                  {daply.likeCount}
                </Text>
              </View>
              <View row center>
                <AntIcon size={12} name="star" color={Colors.yellow40} />
                <Text text100L grey30 marginL-2>
                  {daply.favoriteCount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    </View>
  );
}

export default FeedDaplyItem;
