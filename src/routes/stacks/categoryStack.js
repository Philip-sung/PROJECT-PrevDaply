import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DaplyCategoryScreen from '../../screens/DaplyCategoryScreen';
import DaplyListByCategoryScreen from '../../screens/DaplyListByCategoryScreen';
import { renderDateScreens } from '.';
import DateListByCategoryScreen from '../../screens/DateListByCategoryScreen';
export const Stack = createStackNavigator();

export default function CategoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="SignIn"
        options={{ headerShown: false }}
        component={DaplyCategoryScreen}
      />
      <Stack.Screen
        name="DaplyListByCategory"
        component={DaplyListByCategoryScreen}
        options={({ route }) => ({ title: route.params.categoryName })}
      />
      <Stack.Screen
        name="DateListByCategory"
        component={DateListByCategoryScreen}
        options={({ route }) => ({ title: route.params.themeName })}
      />
      {renderDateScreens()}
    </Stack.Navigator>
  );
}
