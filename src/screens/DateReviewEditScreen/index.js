import React, { useEffect, useState, useRef } from 'react';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {
  Button,
  View,
  KeyboardAwareScrollView,
  Colors,
  Incubator,
} from 'react-native-ui-lib';

import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { ImageWrapper } from '../DateDetailScreen/styles';
import { dateActions } from '../../redux/date';
import {
  borderRadius,
  mainPaddingHorizontal,
  mainPaddingVertical,
} from '../../styles';
import { initImageLibrary } from '../../utils/image';

const { TextField } = Incubator;

const DateReviewEditScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const { dateReview, targetImageList } = params;
  const { dateReviewImageList, content, id } = dateReview;
  const dispatch = useDispatch();
  const [_content, setContent] = useState(content);
  const [_imageList, setImageList] = useState([]);
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const dateState = useSelector((state) => state.date);
  const { updateLoading } = dateState;
  const inputRef = useRef(null);
  const hasImage = dateReviewImageList.length > 0;

  // effects

  // 이미지 업데이트
  useEffect(() => {
    // 이미지 업로더 부터 온 리스트
    if (!targetImageList) return;
    setHasImageChanged(true);
    setImageList(targetImageList);
  }, [targetImageList]);

  useEffect(() => {
    setContent(content);
  }, [dateReview]);

  const contentInput = {
    ref: inputRef,
    value: _content,
    onChangeText: (txt) => setContent(txt),
  };

  const onPressUpdate = () => {
    dispatch(
      dateActions.updateReview({
        reviewId: id,
        content: _content,
        imageList: hasImageChanged ? _imageList : [],
      }),
    );
  };

  const onPressEditImage = () => {
    initImageLibrary({
      screen: 'DateEdit',
      selectionLimit: 15,
      extra: { dateReview },
    });
  };

  const renderImageList = () => {
    if (!hasImageChanged) {
      return (
        <Swiper
          activeDotColor={Colors.point}
          removeClippedSubviews={false}
          loop={false}
        >
          {dateReviewImageList.map((y) => (
            <FastImage
              key={`reviewImage-${y.id}`}
              source={{
                uri: y.imageUrl,
              }}
              style={{ flex: 1, borderRadius }}
            ></FastImage>
          ))}
        </Swiper>
      );
    }
    return (
      <Swiper
        activeDotColor={Colors.point}
        removeClippedSubviews={false}
        loop={false}
      >
        {_.sortBy(_imageList, 'selectedIndex').map((x) => (
          <FastImage
            key={`reviewImage-chagned-${x.uri}`}
            source={{ uri: x.cropped ? x.cropped.path : x.uri }}
            style={{ flex: 1 }}
          ></FastImage>
        ))}
      </Swiper>
    );
  };

  return (
    <KeyboardAwareScrollView
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        paddingVertical: mainPaddingVertical,
        paddingHorizontal: mainPaddingHorizontal,
      }}
      getTextInputRefs={() => [inputRef.current]}
    >
      {hasImage && (
        <ImageWrapper>
          <Swiper
            activeDotColor={Colors.point}
            removeClippedSubviews={false}
            loop={false}
          >
            {renderImageList()}
          </Swiper>
          <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
            <Button onPress={onPressEditImage} label="수정"></Button>
          </View>
        </ImageWrapper>
      )}
      <View marginT-20>
        <TextField multiline {...contentInput}></TextField>
      </View>
      <Button
        label={updateLoading ? '수정중...' : '수정하기'}
        disabled={(content === _content && !hasImageChanged) || updateLoading}
        onPress={onPressUpdate}
      ></Button>
    </KeyboardAwareScrollView>
  );
};

export default DateReviewEditScreen;
