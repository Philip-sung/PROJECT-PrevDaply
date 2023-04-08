import React, { useState } from 'react';
import { Alert } from 'react-native';
import useCountDown from 'react-countdown-hook';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Colors, View, Text } from 'react-native-ui-lib';
import { TextInputMask } from 'react-native-masked-text';
import { DotIndicator } from 'react-native-indicators';
import { authActions } from '~/redux/auth';
import { AuthWrapper } from '~/styles/auth';
import { keyboardConfig } from '~/configs';
import { msToTime } from '~/utils';

const initialTime = 60 * 2000; // initial time in milliseconds, defaults to 60000
const interval = 1000; // interval to change remaining time amount, defaults to 1000

const PhoneScreen = ({ navigation }) => {
  const { navigate } = navigation;
  const authState = useSelector((state) => state.auth);
  const { verifyNumber } = authState;
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(
    initialTime,
    interval,
  );
  const [messageSent, setMessageSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [_verifyNumber, setVerifyNumber] = useState('');

  const dispatch = useDispatch();

  const { phoneDuplicated, phoneCheckLoading } = useSelector(
    (state) => state.auth,
  );

  const phoneInputProps = {
    value: phone,
    maxLength: 13,
    onChangeText: (txt) => {
      if (txt.length <= 13) {
        setPhone(txt);
        dispatch(authActions.postPhoneCheck(txt));
      }
    },
  };

  const verifyInputProps = {
    value: _verifyNumber,
    onChangeText: (txt) => setVerifyNumber(txt),
    maxLength: 6,
  };

  const sendMessage = () => {
    setMessageSent(true);
    dispatch(authActions.postPhoneVerifyAction(phone));
    start();
  };

  const proceedToEmail = () => {
    if (verifyNumber !== _verifyNumber) {
      Alert.alert('올바르지 않습니다');
    } else {
      navigate('Email', {
        phone,
      });
    }
  };

  const renderContent = () => {
    if (!messageSent) {
      return (
        <View width="100%">
          <View width="100%">
            <View
              width="100%"
              centerV
              marginB-10
              style={{
                alignItems: 'flex-start',
                height: 20,
              }}
            >
              {phoneCheckLoading && (
                <DotIndicator
                  count={3}
                  size={5}
                  color={Colors.secondary}
                ></DotIndicator>
              )}
              {phoneDuplicated && !phoneCheckLoading && (
                <Text text90L error>
                  이미 가입된 번호입니다
                </Text>
              )}
            </View>
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
          </View>
          <Button
            label="확인"
            onPress={sendMessage}
            disabled={phone.length < 13 || phoneDuplicated || phoneCheckLoading}
          />
        </View>
      );
    }

    return (
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextField
            {...verifyInputProps}
            keyboardType="numeric"
            containerStyle={{ flex: 1, marginRight: 15 }}
            autoFocus
            placeholder="인증번호를 입력해주세요"
          />
          <Text color={Colors.secondary}>{msToTime(timeLeft)}</Text>
        </View>
        <Button
          label="확인"
          onPress={proceedToEmail}
          disabled={_verifyNumber.length !== 6}
        />
      </View>
    );
  };

  return <AuthWrapper {...keyboardConfig}>{renderContent()}</AuthWrapper>;
};

export default PhoneScreen;
