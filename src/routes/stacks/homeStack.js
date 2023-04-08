import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { renderDateScreens } from '.';
import DaplyCategoryScreen from '../../screens/DaplyCategoryScreen';
import FeelingDetailScreen from '../../screens/FeelingDetailScreen';

import HomeScreen from '../../screens/HomeScreen';
import NotiScreen from '../../screens/NotiScreen';
import SearchScreen from '../../screens/SearchScreen';
export const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="FeelingDetail"
        component={FeelingDetailScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Search"
        component={SearchScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="Noti"
        component={NotiScreen}
        options={{
          headerTitle: '알림',
        }}
      />
      <Stack.Screen
        name="HomeDaplyCategory"
        component={DaplyCategoryScreen}
        options={{
          headerTitle: '플레이리스트 카테고리',
        }}
      />

      {renderDateScreens()}
    </Stack.Navigator>
  );
}
