import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Text, View, Avatar, Button } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/user';
import {
  mainPaddingVertical,
  paddingHorizontal,
  Touchable,
} from '../../styles';
import { MainWrapper } from '../../styles/main';

const FollowerScreen = ({ navigation, route }) => {
  const { navigate, push } = navigation;
  const { params } = route;
  const { followerListLoading, followerList } = useSelector(
    (state) => state.user,
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onPressUser = (_creator) => {
    push('User', { userId: _creator.id, nickname: _creator.nickname });
  };

  useEffect(() => {
    dispatch(userActions.getFollowerList(params?.userId));
  }, []);

  const renderItem = ({ item, index }) => (
    <View centerV row spread marginB-15>
      <Touchable onPress={() => onPressUser(item.follower)}>
        <View centerV row>
          <Avatar size={30} source={{ uri: item.follower.profileImg }}></Avatar>
          <Text marginL-10>{item.follower.nickname}</Text>
        </View>
      </Touchable>
      <View centerV>
        <Text grey40>{item.hasFollowed ? '팔로우중' : ''}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal,
        paddingVertical: mainPaddingVertical,
      }}
      renderItem={renderItem}
      data={followerList}
    ></FlatList>
  );
};

export default FollowerScreen;
