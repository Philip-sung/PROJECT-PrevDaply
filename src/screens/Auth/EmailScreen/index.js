import React, { useState } from 'react';
import { DotIndicator } from 'react-native-indicators';
import { Incubator, Text, Button, View, Colors } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { keyboardConfig } from '~/configs';
import { authActions } from '~/redux/auth';
import { AuthWrapper } from '~/styles/auth';

const { TextField } = Incubator;

function isEmailValid(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

const EmailScreen = ({ route, navigation }) => {
  const { navigate } = navigation;
  const { phone } = route.params;
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const { emailCheckLoading, emailDuplicated } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  const emailInput = {
    value: email,
    onChangeText: (txt) => {
      setEmail(txt);
      dispatch(authActions.getEmailCheckAction(txt));
      setIsValid(isEmailValid(txt));
    },
    autoFocus: true,
  };

  const proceedToNickname = () => {
    navigate('Nickname', {
      phone,
      email,
    });
  };

  const renderText = () => {
    if (!isValid) {
      return (
        <Text text90L error>
          올바른 이메일 형식이 아닙니다
        </Text>
      );
    }
    if (emailDuplicated) {
      return (
        <Text text90L error>
          이미 사용중인 이메일 입니다
        </Text>
      );
    }
    return null;
  };

  return (
    <AuthWrapper {...keyboardConfig}>
      <View
        width="100%"
        centerV
        marginB-10
        left
        height={20}
        row
        style={{
          justifyContent: 'flex-start',
        }}
      >
        <View marginR-5>{renderText()}</View>
        <View>
          {emailCheckLoading && (
            <DotIndicator
              count={3}
              size={5}
              color={Colors.secondary}
            ></DotIndicator>
          )}
        </View>
      </View>
      <TextField {...emailInput} placeholder="이메일을 입력해주세요" />
      <Button
        onPress={proceedToNickname}
        disabled={email.length === 0 || emailDuplicated}
        label="다음으로"
      />
    </AuthWrapper>
  );
};

export default EmailScreen;
