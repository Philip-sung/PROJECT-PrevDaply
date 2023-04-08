import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../../screens/Auth/SignUpScreen';
import PhoneScreen from '../../screens/Auth/PhoneScreen';
import PasswordScreen from '../../screens/Auth/PasswordScreen';
import NicknameScreen from '../../screens/Auth/NicknameScreen';
import SignInScreen from '../../screens/Auth/SignInScreen';
import SignInPhoneScreen from '../../screens/Auth/SignInPhoneScreen';
import EmailScreen from '../../screens/Auth/EmailScreen';
import TutorialScreen from '../../screens/TutorialScreen';
import { getItemFromAsync } from '../../hooks/requests';
import TermScreen from '../../screens/TermScreen';
export const Stack = createStackNavigator();

export default function AuthStack() {
  async function getInitialScreen() {
    const userId = await getItemFromAsync('userId');
    return userId ? 'SignIn' : 'SignUp';
  }

  return (
    <Stack.Navigator initialRouteName={getInitialScreen()}>
      <Stack.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={{ headerShown: false, headerBackTitle: '튜토리얼' }}
      />
      <Stack.Screen
        name="Term"
        component={TermScreen}
        options={{ title: '약관' }}
      ></Stack.Screen>
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: '회원가입' }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: '로그인' }}
      />
      <Stack.Screen
        name="Phone"
        component={PhoneScreen}
        options={{ title: '휴대폰 번호' }}
      />
      <Stack.Screen
        name="Email"
        component={EmailScreen}
        options={{ title: '이메일' }}
      />
      <Stack.Screen
        name="SignInPhone"
        component={SignInPhoneScreen}
        options={{ title: '휴대폰 로그인' }}
      />
      <Stack.Screen
        name="Nickname"
        component={NicknameScreen}
        options={{ title: '닉네임' }}
      />
      <Stack.Screen
        name="Password"
        component={PasswordScreen}
        options={{ title: '비밀번호' }}
      />
    </Stack.Navigator>
  );
}
