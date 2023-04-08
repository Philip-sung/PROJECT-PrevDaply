import React from 'react';
import { Button, Text, Avatar, Colors, View } from 'react-native-ui-lib';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { Header } from '~/styles/main';

import pencilWhite from '~/assets/icons/pencilWhite.png';

import { wp } from '~/styles';

const badgeProps = {
  icon: pencilWhite,
  size: 16,
  borderWidth: 1.5,
  borderColor: Colors.secondary,
  backgroundColor: Colors.secondary,
  iconStyle: {
    width: 10,
    height: 10,
  },
};

const ProfileHeader = ({
  user,
  dateCount,
  followingCount,
  followerCount,
  onPressFollower,
  onPressFollowing,
  onPressAvatar,
}) => (
  <Header>
    <View spread row marginV-10>
      <Avatar
        animate
        onPress={onPressAvatar}
        size={60}
        source={{ uri: user.profileImg }}
        badgeProps={badgeProps}
        badgePosition="BOTTOM_RIGHT"
      ></Avatar>
      <View
        row
        style={{
          width: wp('50%'),
          // borderWidth: 1,
          // borderColor: 'red',
          justifyContent: 'space-around',
        }}
      >
        <TouchableWithoutFeedback onPress={onPressFollower}>
          <View center>
            <Text text60BL>{followerCount}</Text>
            <Text text80L>팔로워</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressFollowing}>
          <View center>
            <Text text60BL>{followingCount}</Text>
            <Text text80L>팔로잉</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View center>
            <Text text60BL>{dateCount}</Text>
            <Text text80L>데이트</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  </Header>
);

export default ProfileHeader;
