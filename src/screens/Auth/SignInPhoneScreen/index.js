import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, View, Text } from 'react-native-ui-lib';
import { TextInputMask } from 'react-native-masked-text';
import { authActions } from '~/redux/auth';
import { AuthWrapper } from '~/styles/auth';
import { keyboardConfig } from '~/configs';

const { TextField } = Incubator;

const SignInPhoneScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const authState = useSelector((state) => state.auth);
  const { loginLoading } = authState;

  const dispatch = useDispatch();

  const phoneInputProps = {
    value: phone,
    onChangeText: (txt) => setPhone(txt),
  };

  const passwordInputProps = {
    value: password,
    placeholder: '비밀번호를 입력하세요',
    onChangeText: (txt) => setPassword(txt),
    secureTextEntry: true,
  };

  const signIn = () => {
    dispatch(authActions.logInAction({ phone, password }));
  };

  return (
    <AuthWrapper {...keyboardConfig}>
      <TextInputMask
        {...phoneInputProps}
        type="custom"
        options={{
          mask: '999-9999-9999',
        }}
        customTextInput={TextField}
        customTextInputProps={{
          placeholder: '휴대폰 번호를 입력하세요',
          keyboardType: 'numeric',
          autoFocus: true,
        }}
      />
      <TextField {...passwordInputProps}></TextField>
      <View style={{ width: '100%' }} right marginB-20>
        <Button link label="비밀번호를 잊으셨나요?"></Button>
      </View>
      <Button
        label={!loginLoading ? '로그인' : '로딩중'}
        onPress={signIn}
        disabled={phone.length !== 13 || loginLoading}
      />
    </AuthWrapper>
  );
};

export default SignInPhoneScreen;
