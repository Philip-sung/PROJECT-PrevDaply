import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactScreen from '../../screens/Post/ContactScreen';
import FeelingScreen from '../../screens/Post/FeelingScreen';
import IntroScreen from '../../screens/Post/IntroScreen';
import KakaoLocationScreen from '../../screens/Post/KakaoLocationScreen';
import QuestionScreen from '../../screens/Post/QuestionScreen';

export const Stack = createStackNavigator();

export default function PostStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
      }}
    >
      {/* <Stack.Screen name="Contact" component={ContactScreen}></Stack.Screen> */}
      <Stack.Screen
        name="KakaoLocSearch"
        component={KakaoLocationScreen}
      ></Stack.Screen>
      <Stack.Screen name="Intro" component={IntroScreen}></Stack.Screen>
      <Stack.Screen name="Question" component={QuestionScreen}></Stack.Screen>
      <Stack.Screen name="Feeling" component={FeelingScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
