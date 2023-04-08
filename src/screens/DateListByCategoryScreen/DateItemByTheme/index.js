import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, View, Colors } from 'react-native-ui-lib';
import { top10Color, Touchable } from '../../../styles';

import { parseLocation } from '../../../utils/location';

const DateItemByTheme = ({ date, onPressDate, displayRank, index }) => (
  <Touchable onPress={() => onPressDate(date)}>
    <View row paddingB-5>
      <FastImage
        style={{ width: 26, height: 26, borderRadius: 13 }}
        source={{ uri: date.creator.profileImg }}
      ></FastImage>
      <View marginL-5>
        <Text text90BO>{date.nickname}</Text>
        <Text text100L grey10>
          {date.creator._count.dateList}번의 데이트
        </Text>
      </View>
    </View>
    <View style={{ width: '100%', aspectRatio: 1 }}>
      <FastImage
        style={{ width: '100%', height: '100%' }}
        source={{ uri: date.mainImg }}
      ></FastImage>
      {displayRank && index <= 2 && (
        <View
          abs
          style={{ top: 5, right: 5 }}
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
    <Text text80BO marginT-10>
      {date.title}
    </Text>
    <View row marginT-10>
      <View
        paddingH-5
        paddingV-2
        br20
        center
        marginR-5
        style={{ borderColor: Colors.point, borderWidth: 1 }}
      >
        <Text point text90L>
          #{date.subGroupName}
        </Text>
      </View>
      <View
        paddingH-5
        paddingV-2
        br20
        center
        style={{ borderColor: Colors.point, borderWidth: 1 }}
      >
        <Text point text90L>
          #
          {parseLocation({
            location: date.kakaoAddressName,
            index: 1,
          })}
        </Text>
      </View>
    </View>
  </Touchable>
);

DateItemByTheme.defaultProps = {
  index: 0,
};

export default DateItemByTheme;
