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

const FollowingScreen = ({ navigation, route }) => {
  const { push } = navigation;
  const { params } = route;
  const { followingListLoading, followingList } = useSelector(
    (state) => state.user,
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onPressUser = (_creator) => {
    push('User', { userId: _creator.id, nickname: _creator.nickname });
  };

  useEffect(() => {
    dispatch(userActions.getFollowingList());
  }, []);

  const renderItem = ({ item, index }) => (
    <View centerV row spread marginB-15>
      <Touchable onPress={() => onPressUser(item.following)}>
        <View centerV row>
          <Avatar
            size={30}
            source={{ uri: item.following.profileImg }}
          ></Avatar>
          <Text marginL-10>{item.following.nickname}</Text>
        </View>
      </Touchable>
      <View centerV></View>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal,
        paddingVertical: mainPaddingVertical,
      }}
      renderItem={renderItem}
      data={followingList}
    ></FlatList>
  );
};

export default FollowingScreen;
