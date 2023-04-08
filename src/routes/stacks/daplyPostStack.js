import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DaplyCategoryScreen from '../../screens/DaplyPost/DaplyCategoryScreen';
import DaplyInitScreen from '../../screens/DaplyPost/DaplyInitScreen';
import MyDateList from '../../screens/DaplyPost/MyDateList';

const Stack = createStackNavigator();

export default function DaplyPostStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="DaplyInit"
        component={DaplyInitScreen}
      ></Stack.Screen>
      <Stack.Screen name="MyDateList" component={MyDateList} />
      <Stack.Screen
        name="DaplyCategory"
        options={{ headerTitle: '카테고리 선택' }}
        component={DaplyCategoryScreen}
      />
    </Stack.Navigator>
  );
}
