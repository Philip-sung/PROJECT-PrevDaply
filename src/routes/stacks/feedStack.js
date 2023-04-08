import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { renderDateScreens } from '.';

import FeedScreen from '../../screens/FeedScreen';

export const Stack = createStackNavigator();

export default function FeedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Feed"
        component={FeedScreen}
      ></Stack.Screen>
      {renderDateScreens()}
    </Stack.Navigator>
  );
}
