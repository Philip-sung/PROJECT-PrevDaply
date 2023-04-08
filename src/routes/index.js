import React, { useEffect, useState, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'react-native';
import OneSignal from 'react-native-onesignal';
import MainTab from './stacks/mainTab';
import AuthStack from './stacks/authStack';
import PostStack from './stacks/postStack';
import DaplyPostStack from './stacks/daplyPostStack';
import { authActions } from '../redux/auth';
import SettingScreen from '../screens/SettingScreen';
import PhotoLibrary from '../components/PhotoLibrary';
import FollowingScreen from '../screens/FollowingScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import DateDetailScreen from '../screens/DateDetailScreen';
import DateEditScreen from '../screens/DateReviewEditScreen';
import DaplyDetailScreen from '../screens/DaplyDetailScreen';
import { notiActions } from '../redux/notification';
import DateCommentScreen from '../screens/DateCommentScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import { renderDateScreens } from './stacks';
import { dateActions } from '../redux/date';
import InitScreen from '../screens/InitScreen';
import { notiToScreen } from '../notification';
import { daplyActions } from '../redux/daply';

export const Stack = createStackNavigator();
export const Tab = createBottomTabNavigator();

function RootStack() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(async () => {
    dispatch(authActions.getMeAction());

    const appStateSubscription = AppState.addEventListener(
      'change',
      (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
          dispatch(notiActions.getNotiList());
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      },
    );

    // Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        const notification = notificationReceivedEvent.getNotification();
        // const data = notification.additionalData;
        // notiToScreen(data);
        notificationReceivedEvent.complete(notification);
      },
    );

    // Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((message) => {
      dispatch(
        notiActions.readNoti(message.notification.additionalData.payload.id),
      );
      notiToScreen(message.notification.additionalData);
    });

    OneSignal.addPermissionObserver(async (event) => {
      const deviceState = await OneSignal.getDeviceState();
      const { userId } = deviceState;
      dispatch(
        authActions.putPushAllowed({
          pushAllowed: event.to.status === 2 ? 1 : 0,
          signalId: userId,
        }),
      );
    });

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!user.id) return;
    dispatch(dateActions.getMyDateList());
    dispatch(daplyActions.getMyDaplyList());
  }, [user]);

  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Group>
        <Stack.Screen
          name="Init"
          component={InitScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="MainTab"
          component={MainTab}
          options={({ route }) => ({
            // headerTitle: getHeaderTitle({ route, user }),
            headerShown: false,
            animationEnabled: false,
          })}
        />
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={({ route }) => ({
            headerShown: false,
            animationEnabled: false,
          })}
        />
        <Stack.Screen name="Setting" component={SettingScreen}></Stack.Screen>
        <Stack.Screen
          name="Following"
          options={{
            headerTitle: '팔로잉',
          }}
          component={FollowingScreen}
        />
        <Stack.Screen
          name="Favorite"
          options={{
            headerTitle: '즐겨찾기',
          }}
          component={FavoriteScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: '',
          }}
          name="DateEdit"
          component={DateEditScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerTitle: '',
          }}
          name="PostDetailConfirm"
          component={DateDetailScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerTitle: '',
          }}
          name="PostDaplyConfirm"
          component={DaplyDetailScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{
            headerTitle: '댓글',
          }}
          name="DateComment"
          component={DateCommentScreen}
        ></Stack.Screen>
        {renderDateScreens()}
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="Post"
          component={PostStack}
          options={({ route }) => ({
            headerShown: false,
          })}
        ></Stack.Screen>
        <Stack.Screen
          name="DaplyPostStack"
          component={DaplyPostStack}
          options={({ route }) => ({
            headerShown: false,
          })}
        ></Stack.Screen>
        <Stack.Screen
          name="PhotoLibrary"
          component={PhotoLibrary}
          options={{
            headerTitle: '',
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEditScreen}
          options={{
            headerTitle: '프로필 편집',
          }}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export { RootStack };
