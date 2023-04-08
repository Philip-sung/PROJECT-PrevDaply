import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, View, Colors } from 'react-native-ui-lib';
import {
  borderRadius,
  hp,
  ListImageWidth,
  paddingHorizontal,
  Touchable,
  wp,
} from '../../styles';
const imageWidth = wp('25%');

const UserListItemBig = ({ user, onPressUser }) => {
  const a = '';
  return (
    <Touchable onPress={() => onPressUser(user)}>
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.grey60,
          marginBottom: hp('1%'),
          borderRadius,
          paddingHorizontal: 10,
        }}
        row
        paddingV-10
      >
        <View center marginR-15 width={imageWidth} height={imageWidth}>
          <FastImage
            style={{
              width: imageWidth / 1.5,
              height: imageWidth / 1.5,
              borderRadius: imageWidth / 3,
            }}
            source={{ uri: user.profileImg }}
          ></FastImage>
        </View>
        <View centerV>
          <Text grey10 text80BO>
            {user.nickname}
          </Text>
          <Text marginT-5 text90BL grey30 marginR-5>
            {user.dateCount}개의 데이트
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

export default UserListItemBig;
