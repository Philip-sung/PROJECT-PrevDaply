import React from 'react';
import { Button, Text, Avatar, Colors, View } from 'react-native-ui-lib';

import { useSelector } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { Header } from '~/styles/main';

import pencilIcon from '~/assets/icons/pencil.png';

import { wp } from '~/styles';
import { DotLoader } from '../../../components/Loader';

const badgeProps = {
  icon: pencilIcon,
  size: 20,
  borderWidth: 1.5,
  borderColor: Colors.white,
  iconStyle: { backgroundColor: Colors.yellow20 },
};

const ProfileHeader = ({
  user,
  dateCount,
  isMe,
  onPressFollow,
  onPressFollower,
  followerCount,
}) => {
  const { followMap, followLoading, deleteFollowLoading } = useSelector(
    (state) => state.user,
  );

  const renderButtonText = () => {
    if (followLoading) return '팔로잉중...';
    if (deleteFollowLoading) return '팔로잉 취소중...';
    if (followMap.id) return '팔로우중';
    return '팔로우';
  };

  return (
    <Header>
      <View spread row marginT-20 marginB-10>
        <Avatar size={60} source={{ uri: user.profileImg }}></Avatar>
        <View
          row
          style={{
            width: wp('40%'),
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
          <TouchableWithoutFeedback>
            <View center>
              <Text text60BL>{dateCount}</Text>
              <Text text80L>데이트</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {!isMe && (
        <View marginT-10 style={{ width: '100%' }}>
          <Button
            onPress={onPressFollow}
            outline={!followMap.id}
            size="small"
            disabled={followLoading || deleteFollowLoading}
            label={renderButtonText()}
          ></Button>
        </View>
      )}
    </Header>
  );
};

export default ProfileHeader;
