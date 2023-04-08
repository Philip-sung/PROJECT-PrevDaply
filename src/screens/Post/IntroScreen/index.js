import React, { useState, useEffect, useRef } from 'react';
import { Alert, TextInput, ScrollView } from 'react-native';
import { Text, View, Button, Colors } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import { dateActions } from '../../../redux/date';
import {
  mainPaddingHorizontal,
  mainPaddingVertical,
  paddingHorizontal,
} from '../../../styles';
import ImageUploader from '../../../components/ImageUploader';

import { ListHeader } from '..';
import { DATE_TITLE_LENGTH } from '../../../configs';

const IntroScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const { location, targetImageList } = params;

  const dispatch = useDispatch();
  const dateState = useSelector((state) => state.date);
  const { postingDate, postLoading } = dateState;
  const { title, mainImg } = postingDate;

  const [_title, setTitle] = useState(title);
  const [_mainImg, setMainImage] = useState(mainImg);
  const [_location, setLocation] = useState(location);
  const [isTitleLengthOver, setTitleLengthOver] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!location) return;
    setLocation(location);
  }, [location]);

  useEffect(() => {
    // 이미지 업로더 부터 온 리스트
    if (!targetImageList) return;
    setMainImage(targetImageList[0]);
    dispatch(dateActions.setPostingDate({ mainImg: targetImageList[0] }));
    inputRef?.current.focus();
  }, [targetImageList]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (postLoading) return;
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          '뒤로 돌아가시겠습니까?',
          '장소를 바꾸시면 작성한 내용이 모두 사라집니다',
          [
            {
              text: '뒤로가기',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => {
                navigation.dispatch(e.data.action);
                dispatch(dateActions.initPostingDate());
              },
            },
            { text: '취소', style: 'cancel', onPress: () => {} },
          ],
          { cancelable: true },
        );
      }),
    [navigation, postLoading],
  );

  const titleInput = {
    value: _title,
    onChangeText: (text) => {
      setTitle(text);
    },
    placeholder: '데이트의 제목',
    ref: inputRef,
  };

  const onPressNext = () => {
    dispatch(dateActions.setPostingDate({ title: _title, mainImg: _mainImg }));
    navigate('Question', { location: _location });
  };

  const renderScrollable = (panHandlers) => (
    <ScrollView
      keyboardDismissMode="interactive"
      {...panHandlers}
      contentContainerStyle={{
        paddingTop: mainPaddingVertical,
        paddingBottom: mainPaddingVertical * 2 + 20,
        paddingHorizontal: mainPaddingHorizontal,
      }}
    >
      <ListHeader
        title="Step 02"
        subTitle="이번 데이트의 제목을 지어주세요"
      ></ListHeader>
      <View>
        <Text grey40 marginB-10>
          대표 이미지
        </Text>
        <ImageUploader
          screen="Intro"
          selectionLimit={1}
          imageList={mainImg ? [mainImg] : []}
        ></ImageUploader>
      </View>
    </ScrollView>
  );

  return (
    <KeyboardAccessoryView
      renderScrollable={renderScrollable}
      contentContainerStyle={{ marginBottom: 10 }}
      spaceBetweenKeyboardAndAccessoryView={-10}
    >
      <>
        {_title.length > DATE_TITLE_LENGTH && (
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.red40,
              backgroundColor: Colors.red30,
            }}
            padding-5
          >
            <Text color="white" text90>
              데이트 제목은 50글자를 초과할 수 없습니다
            </Text>
          </View>
        )}
        <View
          flex
          row
          spread
          backgroundColor="white"
          style={{
            paddingHorizontal,
            paddingVertical: mainPaddingVertical,
            borderTopWidth: 1,
            borderColor: Colors.grey50,
          }}
        >
          <View flex-4 paddingR-10>
            <TextInput {...titleInput} multiline></TextInput>
          </View>
          <View flex-1 centerV>
            <Button
              disabled={
                _title.length === 0 ||
                !_mainImg ||
                _title.length > DATE_TITLE_LENGTH
              }
              onPress={onPressNext}
              size="small"
              label="다음"
            ></Button>
          </View>
        </View>
      </>
    </KeyboardAccessoryView>
  );
};

export default IntroScreen;
