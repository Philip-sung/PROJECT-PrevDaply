import React from 'react';
import { Text, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { AuthWrapper } from '~/styles/auth';
import Logo from '../../../assets/icons/logo.png';
import { authActions } from '../../../redux/auth';

import { hp, wp } from '../../../styles';

const SignUpScreen = ({ navigation }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();

  const kakaoLogin = async () => {
    dispatch(authActions.initKakaoLogin());
  };

  return (
    <AuthWrapper>
      <View center style={{ marginBottom: hp('20%') }}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={Logo}
          style={{
            width: wp('35%'),
            height: 100,
          }}
        ></FastImage>
      </View>

      <Button
        onPress={() => navigate('Term')}
        label="휴대폰 번호로 시작하기"
        style={{ marginBottom: 10 }}
      />
      {/* <Button
        marginB-10
        onPress={kakaoLogin}
        label="카카오로 시작하기"
        backgroundColor="#FEE500"
        labelStyle={{ color: '#000000' }}
      ></Button> */}
      <Button
        onPress={() => navigate('SignIn')}
        label="로그인하기"
        outline
        style={{ marginBottom: 10 }}
      />
    </AuthWrapper>
  );
};

export default SignUpScreen;
