import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';
import { ListImageWidth, paddingHorizontal, Touchable } from '../../styles';
const imageWidth = ListImageWidth;

const UserListItem = ({ user, onPressUser }) => (
  <Touchable onPress={() => onPressUser(user)}>
    <View style={{ paddingHorizontal }} row paddingV-10>
      <View centerV marginR-15>
        <FastImage
          style={{
            width: imageWidth,
            height: imageWidth,
            borderRadius: imageWidth / 2,
          }}
          source={{ uri: user.profileImg }}
        ></FastImage>
      </View>
      <View centerV>
        <Text>{user.nickname}</Text>
      </View>
    </View>
  </Touchable>
);

export default UserListItem;
