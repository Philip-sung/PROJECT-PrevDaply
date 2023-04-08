import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Text, View, Avatar, Button } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { dateActions } from '../../redux/date';
import {
  mainPaddingVertical,
  paddingHorizontal,
  Touchable,
} from '../../styles';
import { MainWrapper } from '../../styles/main';

const DateLikeScreen = ({ navigation, route }) => {
  const { navigate, push } = navigation;
  const { params } = route;
  const { dateId } = params;
  const { dateLikeList } = useSelector((state) => state.date);

  const dispatch = useDispatch();

  const onPressUser = (_creator) => {
    push('User', { userId: _creator.id, nickname: _creator.nickname });
  };

  useEffect(() => {
    dispatch(dateActions.getDateLikeList(dateId));
  }, [params.dateId]);

  const renderItem = ({ item, index }) => (
    <View centerV row spread marginB-15>
      <Touchable onPress={() => onPressUser(item.user)}>
        <View centerV row>
          <Avatar size={30} source={{ uri: item.user.profileImg }}></Avatar>
          <Text marginL-10>{item.user.nickname}</Text>
        </View>
      </Touchable>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={{
        paddingVertical: mainPaddingVertical,
        paddingHorizontal,
      }}
      renderItem={renderItem}
      data={dateLikeList}
    ></FlatList>
  );
};

export default DateLikeScreen;
