import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import { View, Text, Card, Colors } from 'react-native-ui-lib';

import AntIcon from 'react-native-vector-icons/AntDesign';

import {
  borderRadius,
  colorTheme,
  hp,
  shadowConfig,
  top10Color,
  Touchable,
  wp,
} from '../../styles';
import { truncate } from '../../utils';
import { parseLocation } from '../../utils/location';

const dotWidth = 4;
const lineWidth = 0.6;

const DaplyItem = ({
  width,
  title,
  mainImg,
  onPress,
  vertical,
  index,
  date,
  dateCount,
  dateList,
  likeCount,
  favoriteCount,
  user,
  onPressProfile,
  displayRank,
}) => {
  const isEven = vertical && index % 2 !== 0;
  const imageWidth = wp(`${width / dateList?.length}%`);
  return (
    <Card
      onPress={user ? null : onPress}
      style={{
        width: wp(`${width}%`),
        marginBottom: vertical ? hp('2%') : 0,
        marginLeft: isEven ? 0 : 10,
        marginRight: isEven ? 10 : 0,
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 0,
        borderColor:
          displayRank && index <= 2 ? top10Color[index] : Colors.grey50,
        borderWidth: displayRank && index <= 2 ? 3 : 1,
        ...shadowConfig,
      }}
    >
      {user && (
        <View style={{ paddingBottom: 5 }} row spread>
          <TouchableWithoutFeedback onPress={() => onPressProfile(user)}>
            <View row centerV>
              <FastImage
                style={{ width: 26, height: 26, borderRadius: 13 }}
                source={{ uri: user.profileImg }}
              ></FastImage>
              <View marginL-5>
                <Text text90BO>{user.nickname}</Text>
                <Text text100L grey10>
                  {user.userDateCount}번의 데이트
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
      <Touchable onPress={onPress}>
        <View style={{ width: '100%', aspectRatio: 1 }}>
          <FastImage
            style={{
              width: '100%',
              height: '100%',
              borderRadius,
            }}
            source={{
              uri: mainImg,
            }}
          ></FastImage>
          {displayRank && index <= 2 && (
            <View
              abs
              style={{
                top: 5,
                right: 5,
              }}
              br50
              center
              width={30}
              height={30}
              backgroundColor={top10Color[index]}
            >
              <Text text80BL>{index + 1}위</Text>
            </View>
          )}
        </View>
        <View paddingH-10>
          {dateList && (
            <View row centerH>
              {dateList.map((x, i) => {
                const isFirst = i === 0;
                const isEnd = i === dateList.length - 1;
                const isMiddle = !isFirst && !isEnd;
                return (
                  <View key={`date-time-line-${x.date.id}`} row centerV>
                    {/* <View bottom={isFirst} marginR-20>
                      <View
                        height={lineWidth}
                        width={isMiddle ? '100%' : '50%'}
                        backgroundColor={Colors.point}
                      ></View>

                    </View> */}
                    <View center width={imageWidth} height={hp('4%')}>
                      <View
                        abs
                        height={lineWidth}
                        width={isMiddle ? '100%' : '50%'}
                        style={{ left: isFirst ? '50%' : 0 }}
                        backgroundColor={Colors.point}
                      ></View>
                      <View
                        backgroundColor={Colors.point}
                        style={{
                          width: dotWidth,
                          height: dotWidth,
                          borderRadius: dotWidth / 2,
                          position: 'absolute',
                          // top: imageWidth / 2 - dotWidth,
                          // right: -dotWidth / 2 + lineWidth / 2,
                        }}
                      ></View>
                      <View abs style={{ top: '50%' }}>
                        <Text point text100M>
                          {x.date.dateSubGroup.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View marginB-5>
          <Text grey10 text80BL>
            {truncate(title, 25)}
          </Text>
        </View>
        <View row centerV spread>
          {date && (
            <Text grey20 text90L>
              {parseLocation({
                location: date.kakaoLocation.addressName,
                index: 1,
              })}{' '}
              외 {dateCount && dateCount - 1}곳
            </Text>
          )}
          <View row>
            <View row center marginR-5>
              <AntIcon size={10} name="heart" color={colorTheme.primary[300]} />
              <Text text100L grey30 marginL-2>
                {likeCount}
              </Text>
            </View>
            <View row center>
              <AntIcon size={10} name="star" color={Colors.yellow40} />
              <Text text100L grey30 marginL-2>
                {favoriteCount}
              </Text>
            </View>
          </View>
        </View>
      </Touchable>
    </Card>
  );
};

DaplyItem.defaultProps = {
  width: 42,
  vertical: true,
  index: 0,
  displayRank: false,
  dateList: [],
};

export default DaplyItem;
