import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DateDetailScreen from '../../screens/DateDetailScreen';
import DateLikeScreen from '../../screens/DateLikeScreen';
import FollowerScreen from '../../screens/FollowerScreen';
import WebviewScreen from '../../screens/WebviewScreen';
import UserScreen from '../../screens/UserScreen';
import DaplyDetailScreen from '../../screens/DaplyDetailScreen';

export const Stack = createStackNavigator();

export function renderDateScreens() {
  return (
    <>
      <Stack.Screen
        options={{ headerBackTitleVisible: false, headerTitle: '' }}
        name="DateDetail"
        component={DateDetailScreen}
      />
      <Stack.Screen
        name="DateLike"
        component={DateLikeScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="Webview"
        component={WebviewScreen}
      ></Stack.Screen>
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="DaplyDetail"
        component={DaplyDetailScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={({ route }) => ({ title: route.params.nickname })}
      />
      <Stack.Screen
        name="Follower"
        options={{
          headerTitle: '팔로워',
        }}
        component={FollowerScreen}
      />
    </>
  );
}
