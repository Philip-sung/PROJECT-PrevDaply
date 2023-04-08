import React, { useState } from 'react';
import { Button, View, Text, Incubator } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { keyboardConfig } from '~/configs';
import { AuthWrapper } from '~/styles/auth';
import { DateLoader } from '../../../components/Loader';
import { authActions } from '../../../redux/auth';

const { TextField } = Incubator;

const PasswordScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const { phone, nickname, email } = route.params;
  const { signUpLoading } = useSelector((state) => state.auth);
  const [isValid, setValid] = useState(false);

  const passwordInput = {
    value: password,
    onChangeText: (txt) => {
      setPassword(txt);
      setValid(txt.match(/(?=.*\d)(?=.*[a-z]).{8,}/));
    },
    autoFocus: true,
    autoCompleteType: 'password',
    secureTextEntry: true,
  };

  const confirmedPasswordInput = {
    value: confirmedPassword,
    onChangeText: (txt) => setConfirmedPassword(txt),
    autoCompleteType: 'password',
    secureTextEntry: true,
  };

  const onPressRegister = () => {
    const payload = {
      nickname,
      phone,
      password,
      email,
    };
    dispatch(authActions.postRegisterAction(payload));
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
            {!isValid && (
              <Text text90L error>
                비밀번호는 영어소문자 숫자 포함 8자 이상입니다
              </Text>
            )}
          </View>
          <TextField {...passwordInput} placeholder="비밀번호를 입력하세요" />
          <TextField
            {...confirmedPasswordInput}
            placeholder="비밀번호를 확인해주세요"
          />
          <Button
            onPress={onPressRegister}
            label="회원가입"
            disabled={
              !isValid || password !== confirmedPassword || signUpLoading
            }
          />
        </>
      )}
    </AuthWrapper>
  );
};

export default PasswordScreen;
