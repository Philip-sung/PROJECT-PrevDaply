import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import {
  FlatList,
  Dimensions,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import { View, Text, Button, Colors } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import { is, List } from 'immutable';
import { sanitizeUri } from './utils';
import { styles } from './styles';
import { imagePickerOptions } from '../../utils';
import { hp, mainPaddingVertical, paddingHorizontal } from '../../styles';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const PhotoWrapper =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const PhotoLibrary = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const { from, imageList } = params;
  const [_imageList, setImageList] = useState([]);
  const [isMultiple, setIsMultiple] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasSelected = _imageList.filter((x) => x.selectedIndex).length > 0;

  useEffect(() => {
    const photos = getPhotos();
    setIsMultiple(photos.length > 1);
    setImageList(photos);
  }, [params]);

  const onPressNext = () => {
    navigate(from, {
      targetImageList: _imageList.filter((x) => x.selectedIndex),
      ...params?.extra,
    });
  };

  const renderSelectedImage = () => (
    <View backgroundColor="white">
      {_imageList[activeIndex] && (
        <View style={styles.deviceSquare}>
          <FastImage
            style={[
              {
                ...styles.strech,
                borderRadius: params.isCircle ? screenWidth / 2 : 0,
              },
            ]}
            source={{
              uri: _imageList[activeIndex].cropped
                ? _imageList[activeIndex].cropped.path
                : _imageList[activeIndex].uri,
              priority: FastImage.priority.normal,
            }}
          ></FastImage>
          <Button
            onPress={() => cropImage(_imageList[activeIndex])}
            label="편집"
            size="small"
            round
            backgroundColor={Colors.secondary}
            style={{ position: 'absolute', right: 10, bottom: 10 }}
          ></Button>
        </View>
      )}
    </View>
  );

  const cropImage = (item) => {
    ImagePicker.openCropper({
      ...imagePickerOptions,
      path: item.uri,
      cropperCircleOverlay: !!params.isCircle,
    })
      .then((cropped) => {
        const targetList = List(_imageList).toJS();
        const targetImageIndex = targetList.findIndex(
          (x) => x.uri === item.uri,
        );
        const targetImage = targetList[targetImageIndex];

        const updated = { ...targetImage, cropped };
        targetList.splice(targetImageIndex, 1, updated);
        setActiveIndex(targetImageIndex);
        setImageList(targetList);
      })
      .catch((err) => console.log(err));
  };

  const getPhotos = () => {
    const indexInserted = imageList.map((x, index) => ({
      ...x,
      selectedIndex: x.selectedIndex ? x.selectedIndex : index + 1,
    }));

    return indexInserted;
  };

  const onClickPhoto = (item) => {
    // 선택이 되어있지 않은 경우에만
    if (!item.selectedIndex) {
      selectTargetImage(item);
    } else {
      // 선택이 되어 있는 경우에는 activeIndex만 바꿈
      const targetIndex = _imageList.findIndex((x) => x.uri === item.uri);
      setActiveIndex(targetIndex);
    }
  };

  const removeTargetImage = (item) => {
    if (!item.selectedIndex) {
      // 버튼 활성화 안되어 있을 때는 선택만
      selectTargetImage(item);
    } else {
      // current image list
      const list = List(_imageList).toJS();

      // imageIndex
      const imageIndex = list.findIndex((x) => x.uri === item.uri);
      const currentActiveImage = _imageList[activeIndex];

      // 0. activeIndex처리
      // 0-1. activeIndex와 클릭한 이미지의 인덱스가 같을 때
      // 맨처음 이미지로 선택해줌
      if (activeIndex === imageIndex) {
        setActiveIndex(0);
      } else {
        // 현재 선택된 이미지의 인덱스 다시 찾고 유지
        const currentActiveIndex = list.findIndex(
          (x) => x.uri === currentActiveImage.uri,
        );
        setActiveIndex(currentActiveIndex);
      }

      // 1-2.imageList null
      const updatedImage = {
        ...item,
        selectedIndex: null,
      };
      list.splice(imageIndex, 1, updatedImage);

      // 1-3.남은 인덱스 찾기
      const filtered = list.filter((x) => x.selectedIndex > item.selectedIndex);

      // 번호 다시매기기
      for (let i = 0; i < filtered.length; i += 1) {
        const index = list.findIndex((x) => x.uri === filtered[i].uri);
        const { selectedIndex } = list[index];
        if (selectedIndex) {
          list[index].selectedIndex = selectedIndex - 1;
        }
      }
      setImageList(list);
    }
  };

  const selectTargetImage = async (item) => {
    // current image list
    const list = List(_imageList).toJS();

    // imageIndex
    const imageIndex = list.findIndex((x) => x.uri === item.uri);
    try {
      // 2.추가

      const filtered = _imageList.filter((x) => x.selectedIndex);
      setActiveIndex(imageIndex);
      // 2-2.imageList에 번호매김
      const updatedImage = {
        ...item,
        selectedIndex: filtered.length + 1,
      };
      list.splice(imageIndex, 1, updatedImage);
      setImageList(list);
    } catch (error) {
      console.log('cancelled');
    }
  };

  const renderItem = ({ item }) => {
    const activeImageObj = _imageList[activeIndex];
    const isActive = activeImageObj && activeImageObj.uri === item.uri;
    const { selectedIndex } = item;
    return (
      <PhotoWrapper onPress={() => onClickPhoto(item)}>
        <View style={styles.photoItem}>
          <FastImage
            style={[{ ...styles.strech, opacity: isActive ? 0.5 : 1 }]}
            source={{
              uri: item.cropped ? item.cropped.path : item.uri,
              priority: FastImage.priority.normal,
            }}
          ></FastImage>
          {isMultiple && (
            <View style={styles.checkButtonWrapper}>
              <PhotoWrapper onPress={() => removeTargetImage(item)}>
                <View
                  style={
                    selectedIndex ? styles.checkedButton : styles.checkButton
                  }
                >
                  {selectedIndex && (
                    <Text style={styles.selectedIndexText}>
                      {selectedIndex}
                    </Text>
                  )}
                </View>
              </PhotoWrapper>
            </View>
          )}
        </View>
      </PhotoWrapper>
    );
  };

  return (
    <View flex-1 column spread>
      {isMultiple && (
        <View style={styles.header}>
          <FlatList
            stickyHeaderIndices={[0]}
            horizontal
            keyExtractor={(item) => item.uri}
            renderItem={renderItem}
            data={_imageList}
          ></FlatList>
        </View>
      )}
      {renderSelectedImage()}
      <View style={{ paddingHorizontal, paddingBottom: hp('5%') }}>
        <Button
          disabled={!hasSelected}
          onPress={onPressNext}
          label="다음"
        ></Button>
      </View>
    </View>
  );
};

export default PhotoLibrary;
