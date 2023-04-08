import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Image, Colors } from 'react-native-ui-lib';
import { navigate } from '../../../routes/navigation';
import { borderRadius, Touchable, wp } from '../../../styles';
import { truncate } from '../../../utils';
import { parseLocation } from '../../../utils/location';

const imageWidth = wp('30%');
const dotWidth = 10;
const lineWidth = 0.6;

const DateTimeline = ({ dateList, onPressDateTimeline }) => (
  <View column>
    {dateList.map((x, i) => {
      const isFirst = i === 0;
      const isEnd = i === dateList.length - 1;
      const isMiddle = !isFirst && !isEnd;
      return (
        <View key={`date-time-line-${x.id}`} row centerV>
          <View column height={imageWidth} bottom={isFirst} marginR-20>
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
            <Touchable onPress={() => onPressDateTimeline(x)}>
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
                <View flex marginL-15>
                  <Text text80BO>{truncate(x.date.title, 25)}</Text>
                  <Text text90L>{x.date.kakaoLocation.addressName}</Text>
                  <View row marginT-10>
                    <Text
                      marginR-10
                      point
                      text100L
                    >{`#${x.date.dateSubGroup.name}`}</Text>
                    <Text point text100L>{`#${parseLocation({
                      location: x.date.kakaoLocation.addressName,
                      index: 2,
                    })}`}</Text>
                  </View>
                </View>
              </View>
            </Touchable>
          </View>
        </View>
      );
    })}
  </View>
);

export default DateTimeline;
