import React, { useState } from 'react';
import { DotIndicator } from 'react-native-indicators';
import { Text, Button, View, Colors, Incubator } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { keyboardConfig } from '~/configs';
import { authActions } from '~/redux/auth';
import { AuthWrapper } from '~/styles/auth';
import { DateLoader } from '../../../components/Loader';

const { TextField } = Incubator;

const NicknameScreen = ({ route, navigation }) => {
  const { navigate } = navigation;
  const { phone, email, isKakao, kakaoId } = route.params;
  const [nickname, setNickname] = useState('');
  const { nicknameCheckLoading, nicknameDuplicated } = useSelector(
    (state) => state.auth,
  );
  const { signUpLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const nicknameInput = {
    value: nickname,
    onChangeText: (txt) => {
      setNickname(txt);
      dispatch(authActions.getNicknameCheckAction(txt));
    },
    autoFocus: true,
  };

  const proceedToPassword = () => {
    if (isKakao) {
      const payload = {
        nickname,
        phone,
        email,
        kakaoId,
      };
      dispatch(authActions.postRegisterAction(payload));
    } else {
      navigate('Password', {
        phone,
        email,
        nickname,
      });
    }
  };

  return (
    <AuthWrapper {...keyboardConfig}>
      {signUpLoading ? (
        <DateLoader wrapperHeight={80}></DateLoader>
      ) : (
        <>
          <View
            width="100%"
            centerV
            marginB-10
            style={{
              alignItems: 'flex-start',
              height: 20,
            }}
          >
            {nicknameCheckLoading && (
              <DotIndicator
                count={3}
                size={5}
                color={Colors.secondary}
              ></DotIndicator>
            )}
            {nicknameDuplicated && !nicknameCheckLoading && (
              <Text text90L error>
                이미 사용중인 닉네임입니다
              </Text>
            )}
          </View>
          <TextField {...nicknameInput} placeholder="닉네임을 입력하세요" />
          <Button
            onPress={proceedToPassword}
            disabled={
              nickname.length === 0 || nicknameDuplicated || signUpLoading
            }
            label={isKakao ? '가입하기' : '다음으로'}
          />
        </>
      )}
    </AuthWrapper>
  );
};

export default NicknameScreen;
