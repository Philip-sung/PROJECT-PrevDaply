import React from 'react';
import { ListItem, Text, Colors, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import notifee from '@notifee/react-native';
import { authActions } from '../../redux/auth';
import {
  mainPaddingVertical,
  paddingHorizontal,
  paddingVertical,
} from '../../styles';
import { MainWrapper } from '../../styles/main';

const SettingScreen = ({ navigation }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();

  const onPressLogout = () => {
    dispatch(authActions.logOutAction());
  };

  const onPressFav = () => {
    navigate('Favorite');
  };

  const onPressInitBadgeCount = () => {
    notifee.setBadgeCount(0);
  };

  return (
    <View
      style={{
        paddingHorizontal,
        paddingVertical: mainPaddingVertical,
      }}
    >
      <ListItem onPress={onPressFav}>
        <Text>즐겨찾기</Text>
      </ListItem>
      <ListItem>
        <Text>오픈소스</Text>
      </ListItem>
      <ListItem onPress={onPressInitBadgeCount}>
        <Text>앱 알림 숫자 초기화 하기</Text>
      </ListItem>
      <ListItem onPress={onPressLogout}>
        <Text>로그아웃</Text>
      </ListItem>
    </View>
  );
};

export default SettingScreen;
