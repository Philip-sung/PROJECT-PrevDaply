import moment from 'moment';
import React, { useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { Text, View, Avatar, Colors } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import notifee from '@notifee/react-native';
import { notiActions } from '../../redux/notification';

import {
  colorTheme,
  mainPaddingVertical,
  paddingHorizontal,
  Touchable,
} from '../../styles';
import { MainWrapper } from '../../styles/main';
import { routeNoti } from '../../notification';

const NotiScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const dispatch = useDispatch();
  const { notiList } = useSelector((state) => state.noti);

  // 질문 불러왔을 때, 현재, 다음 질문 설정
  useFocusEffect(
    useCallback(() => {
      dispatch(notiActions.getNotiList());
    }, []),
  );

  const onPressItem = (item) => {
    if (!item.receiverRead) {
      notifee.decrementBadgeCount();
      dispatch(notiActions.readNoti(item.id));
    }
    routeNoti(item);
  };

  const renderItem = ({ item }) => (
    <Touchable onPress={() => onPressItem(item)}>
      <View
        flex
        padding-10
        marginB-10
        row
        br20
        centerV
        style={{
          borderColor: Colors.grey60,
          borderWidth: 1,
          backgroundColor: !item.receiverRead
            ? 'rgba(108, 133, 255, 0.1)'
            : 'white',
        }}
      >
        <View flex-1 paddingT-5>
          <Avatar size={30} source={{ uri: item.sender.profileImg }}></Avatar>
        </View>
        <View flex-5>
          <Text text90M>{`${item.sender.nickname}님이 ${item.title}`}</Text>
          {item.body.length > 0 && (
            <Text text90M grey30>{`"${item.body}"`}</Text>
          )}
        </View>
        <View flex-1 right paddingT-5>
          <Text text90L grey40>
            {moment(item.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    </Touchable>
  );

  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal,
        paddingVertical: mainPaddingVertical,
      }}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      data={notiList}
    ></FlatList>
  );
};

export default NotiScreen;
