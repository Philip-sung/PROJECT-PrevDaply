/* eslint-disable camelcase */
import React from 'react';
// import KakaoSDK from '@actbase/react-kakaosdk';
import { Button } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import { AuthWrapper } from '~/styles/auth';
import { DateLoader } from '../../../components/Loader';
import { authActions } from '../../../redux/auth';

const SignInScreen = ({ navigation }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const { signUpLoading, kakaoLoading, signInLoading } = useSelector(
    (state) => state.auth,
  );

  const kakaoLogin = async () => {
    dispatch(authActions.initKakaoLogin());
  };

  return (
    <AuthWrapper>
      {kakaoLoading || signInLoading ? (
        <DateLoader wrapperHeight={80}></DateLoader>
      ) : (
        <>
          <Button
            onPress={() => navigate('SignInPhone')}
            label="휴대폰 번호로 로그인"
            style={{ marginBottom: 10 }}
          />
          {/* <Button
            onPress={kakaoLogout}
            label="카카오 로그아웃"
            style={{ marginBottom: 10 }}
          /> */}
          {/* <Button
            onPress={kakaoLogin}
            label="카카오로 로그인"
            backgroundColor="#FEE500"
            labelStyle={{ color: '#000000' }}
          ></Button> */}
          <Button
            link
            marginT-10
            onPress={() => navigate('SignUp')}
            label="회원가입"
            style={{ marginBottom: 10 }}
          />
        </>
      )}
    </AuthWrapper>
  );
};

export default SignInScreen;
