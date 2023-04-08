import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Button,
  Checkbox,
  Colors,
  Text,
  View,
  Dialog,
} from 'react-native-ui-lib';
import Markdown from 'react-native-markdown-display';
import {
  borderRadius,
  hp,
  mainPaddingVertical,
  paddingHorizontal,
  paddingVertical,
} from '../../styles';
import { location, marketing, personal, usage } from './md';

const TermScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const [usageAgree, setUsageAgree] = useState(false);
  const [privateAgree, setPrivateAgree] = useState(false);
  const [locationAgree, setLocationAgree] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const [openType, setOpenType] = useState('');

  const onChangeAll = () => {
    if (privateAgree && locationAgree && marketingAgree) {
      setUsageAgree(false);
      setPrivateAgree(false);
      setLocationAgree(false);
      setMarketingAgree(false);
    } else {
      setUsageAgree(true);
      setPrivateAgree(true);
      setLocationAgree(true);
      setMarketingAgree(true);
    }
  };

  const onChangeUsage = () => {
    setUsageAgree(!usageAgree);
  };

  const onChangePersonal = () => {
    setPrivateAgree(!privateAgree);
  };

  const onChangeLocation = () => {
    setLocationAgree(!locationAgree);
  };

  const onChangeMarketingAgree = () => {
    setMarketingAgree(!marketingAgree);
  };

  const handleDialog = (type) => {
    setOpenType(type);
    setTermOpen(true);
  };

  const renderTitle = () => {
    switch (openType) {
      case 'usage':
        return '데플리 이용약관 ';
      case 'personal':
        return '개인정보 처리방침';

      case 'location':
        return '위치정보 처리방침';

      case 'marketing':
        return '마케팅정보 처리방침';

      default:
        return '';
    }
  };

  const renderTerm = () => {
    switch (openType) {
      case 'usage':
        return usage;

      case 'personal':
        return personal;

      case 'location':
        return location;

      case 'marketing':
        return marketing;

      default:
        return '';
    }
  };

  const onClickAgree = () => {
    switch (openType) {
      case 'usage':
        setUsageAgree(true);
        break;
      case 'personal':
        setPrivateAgree(true);
        break;

      case 'location':
        setLocationAgree(true);
        break;

      case 'marketing':
        setMarketingAgree(true);
        break;

      default:
        break;
    }
    setTermOpen(false);
  };

  const handleConfirm = () => {
    navigate('Phone');
  };

  return (
    <View flex col spread style={{ paddingHorizontal, paddingVertical }}>
      <Dialog visible={termOpen} onDismiss={() => setTermOpen(false)}>
        <View
          backgroundColor="white"
          style={{
            height: hp('70vh'),
            borderRadius,
            paddingHorizontal,
            paddingVertical: mainPaddingVertical,
          }}
        >
          <ScrollView>
            <View>
              <Text text60>{renderTitle()}</Text>
            </View>
            <Markdown>{renderTerm()}</Markdown>
          </ScrollView>
          <View>
            <Button
              size="small"
              onPress={onClickAgree}
              label="동의하기"
            ></Button>
          </View>
        </View>
      </Dialog>
      <View>
        <View row padding-10 marginB-10>
          <Checkbox
            color={Colors.point}
            value={privateAgree && locationAgree && marketingAgree}
            onValueChange={onChangeAll}
          ></Checkbox>
          <Text text70BO marginL-10>
            전체동의
          </Text>
        </View>
        <View
          row
          spread
          padding-10
          marginB-10
          style={{
            borderWidth: 1,
            borderColor: Colors.grey30,
            borderRadius,
          }}
        >
          <View row>
            <Checkbox
              color={Colors.point}
              value={usageAgree}
              onValueChange={onChangeUsage}
            ></Checkbox>
            <Text text70M marginL-10>
              이용약관 동의 (필수)
            </Text>
          </View>
          <Button
            onPress={() => handleDialog('usage')}
            color={Colors.grey40}
            size="small"
            link
            label="내용보기"
          ></Button>
        </View>
        <View
          row
          spread
          padding-10
          marginB-10
          style={{
            borderWidth: 1,
            borderColor: Colors.grey30,
            borderRadius,
          }}
        >
          <View row>
            <Checkbox
              color={Colors.point}
              value={privateAgree}
              onValueChange={onChangePersonal}
            ></Checkbox>
            <Text text70M marginL-10>
              개인 정보 활용 동의 (필수)
            </Text>
          </View>
          <Button
            onPress={() => handleDialog('personal')}
            color={Colors.grey40}
            size="small"
            link
            label="내용보기"
          ></Button>
        </View>
        <View
          row
          spread
          padding-10
          marginB-10
          style={{
            borderWidth: 1,
            borderColor: Colors.grey30,
            borderRadius,
          }}
        >
          <View row>
            <Checkbox
              color={Colors.point}
              value={locationAgree}
              onValueChange={onChangeLocation}
            ></Checkbox>
            <Text text70M marginL-10>
              위치 정보 활용 동의 (필수)
            </Text>
          </View>
          <Button
            onPress={() => handleDialog('location')}
            color={Colors.grey40}
            size="small"
            link
            label="내용보기"
          ></Button>
        </View>
        <View
          row
          spread
          padding-10
          marginB-10
          style={{
            borderWidth: 1,
            borderColor: Colors.grey30,
            borderRadius,
          }}
        >
          <View row>
            <Checkbox
              color={Colors.point}
              value={marketingAgree}
              onValueChange={onChangeMarketingAgree}
            ></Checkbox>
            <Text text70M marginL-10>
              마케팅 정보 활용 동의 (선택)
            </Text>
          </View>
          <Button
            onPress={() => handleDialog('marketing')}
            color={Colors.grey40}
            size="small"
            link
            label="내용보기"
          ></Button>
        </View>
      </View>
      <View>
        <Button
          disabled={!usageAgree || !privateAgree || !locationAgree}
          onPress={handleConfirm}
          label="확인"
        ></Button>
      </View>
    </View>
  );
};

export default TermScreen;
