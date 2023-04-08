import React, { useEffect, useState, useRef } from 'react';

import { View, Text, Button, Colors } from 'react-native-ui-lib';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';

import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, TextInput } from 'react-native';
import ImageUploader from '../../../components/ImageUploader';

import { dateActions } from '../../../redux/date';
import {
  mainPaddingHorizontal,
  mainPaddingVertical,
  paddingHorizontal,
} from '../../../styles';

import {
  getFeature,
  getNextFeature,
  insertedFeatureList,
  updateFeatureList,
} from './utils';

import { LocationLoader } from '../../../components/Loader';

const initialFeature = {
  question: '',
  dateSubGroupId: null,
  imageList: [],
  content: '',
  order: 0,
  placeholder: '',
};

const QuestionScreen = ({ navigation, route }) => {
  const { navigate, push } = navigation;
  const { params } = route;
  const { location, targetImageList } = params;
  const dispatch = useDispatch();
  const dateState = useSelector((state) => state.date);
  const { featureList, featureListLoading, postingDate } = dateState;
  const { location: prevLoc } = postingDate;

  const [feature, setFeature] = useState(initialFeature);
  const [nextFeature, setNextFeature] = useState(initialFeature);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // effects
  useEffect(() => {
    // 이미지 업로더 부터 온 리스트
    // 1. 현재 feature 설정
    // 2. featureList State 설정
    if (!targetImageList) return;
    // 3. 이미지 업로더로 가기전 feature에다가 이미지 삽입
    const targetFeature = { ...feature, imageList: targetImageList };
    updateFeatureListState(targetFeature);
    inputRef?.current.focus();
  }, [targetImageList]);

  // 처음 질문 불러오기
  useEffect(() => {
    if (!location || location.id === prevLoc.id) return;
    dispatch(dateActions.getSubGroupList({ location }));
  }, [location]);

  // targetFeature 설정.
  const getTargetFeature = () => {
    let targetFeature;
    if (!params.feature) {
      // 질문 페이지로 부터 넘어오지 않았을 때는 첫번째 질문 선택
      [targetFeature] = featureList;
    } else {
      // 질문페이지로 넘어왔을 때
      targetFeature = getFeature({
        targetFeature: params.feature,
        featureList,
      });
    }
    return targetFeature;
  };

  useEffect(() => {
    if (location) {
      // 장소 업데이트
      dispatch(
        dateActions.setPostingDate({
          location,
        }),
      );
    }
    if (featureList.length === 0) return;
    let targetFeature = getTargetFeature();
    if (targetImageList) {
      targetFeature = { ...feature, imageList: targetImageList };
    }
    const targetNextFeature = getNextFeature({
      targetFeature,
      featureList,
    });
    setFeature(targetFeature);
    setNextFeature(targetNextFeature);
  }, [featureList, targetImageList]);

  const inputValue = {
    value: feature.content,
    placeholder: '입력하기',
    onChangeText: (txt) => {
      const targetFeature = { ...feature, content: txt };
      setFeature(targetFeature);
      updateFeatureListState(targetFeature);
    },
    ref: inputRef,
    onSubmitEditing: (e) => {
      scrollRef?.current.scrollToEnd();
    },
  };

  const isLast = !nextFeature;

  const updateFeatureListState = (targetFeature) => {
    const updatedFeatureList = updateFeatureList({
      targetFeature,
      featureList,
    });
    dispatch(dateActions.setFeatureList(updatedFeatureList));
  };

  const navigate2NextFeature = () => {
    // 다음 질문으로 넘기기
    const updatedFeatureList = updateFeatureList({
      targetFeature: feature,
      featureList,
    });
    dispatch(dateActions.setFeatureList(updatedFeatureList));
    push('Question', { feature: nextFeature });
  };

  const addFreeFeature = () => {
    const { currentFeatureList, newFeature } = insertedFeatureList({
      featureList,
      targetFeature: feature,
    });
    if (isLast) {
      push('Question', { feature: newFeature });
    } else {
      navigate('Question', { feature: newFeature });
    }
    dispatch(dateActions.setFeatureList(currentFeatureList));
  };

  const navigate2Feeling = () => {
    navigate('Feeling', { featureList, step: feature.order });
  };

  const textInvalid = feature.textRequired && feature.content.length === 0;

  const imageInvalid = feature.imageRequired && feature.imageList.length === 0;

  const nextInvalid = textInvalid || imageInvalid;

  const renderScrollable = (panHandlers) => (
    <ScrollView
      keyboardDismissMode="interactive"
      {...panHandlers}
      ref={scrollRef}
      contentContainerStyle={{
        paddingTop: mainPaddingVertical,
        paddingBottom: mainPaddingVertical * 2 + 20,
        paddingHorizontal: mainPaddingHorizontal,
      }}
    >
      {featureListLoading ? (
        <LocationLoader></LocationLoader>
      ) : (
        <View>
          <View paddingV-25 marginB-10>
            <Text point>{`Step 0${2 + feature.order}`}</Text>
            {/* <Text text50 marginB-10>
              {feature.question}
            </Text> */}
          </View>
          <ImageUploader
            screen="Question"
            selectionLimit={15}
            imageList={feature.imageList}
            params={{ feature }}
          ></ImageUploader>
        </View>
      )}
    </ScrollView>
  );

  return (
    <KeyboardAccessoryView
      renderScrollable={renderScrollable}
      contentContainerStyle={{ marginBottom: 10 }}
      spaceBetweenKeyboardAndAccessoryView={-10}
    >
      <View
        row
        spread
        backgroundColor="white"
        style={{
          maxHeight: 250,
          paddingHorizontal,
          paddingVertical: mainPaddingVertical,
          borderTopWidth: 1,
          borderColor: Colors.grey50,
        }}
      >
        <View flex-3 paddingR-10>
          <Text grey40 text80L>{`ex.) ${feature.question}`}</Text>
          <TextInput {...inputValue} multiline></TextInput>
        </View>
        <View flex-1 centerV>
          {isLast && (
            <Button
              marginB-5
              onPress={addFreeFeature}
              outline
              size="small"
              label="내용추가"
            ></Button>
          )}
          <Button
            onPress={isLast ? navigate2Feeling : navigate2NextFeature}
            disabled={nextInvalid}
            size="small"
            label="다음"
          ></Button>
        </View>
      </View>
    </KeyboardAccessoryView>
  );
};

export default QuestionScreen;
