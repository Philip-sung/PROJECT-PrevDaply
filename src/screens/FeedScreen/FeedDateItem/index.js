import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Colors } from 'react-native-ui-lib';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import { TouchableWithoutFeedback } from 'react-native';
import Pinchable from 'react-native-pinchable';
import { paddingHorizontal, screenWidth } from '../../../styles';
import { parseLocation } from '../../../utils/location';

const FeedDateItem = ({ feed, onPressProfile, onPressDate }) => {
  const {
    creator,
    title,
    mainImg,
    dateSubGroup,
    kakaoLocation,
    dateReviewImageCount,
    createdAt,
    likeCount,
    viewCount,
    commentCount,
    isInner,
  } = feed;
  const feedWidth = isInner ? '100%' : screenWidth;
  return (
    <View
      marginB-20
      paddingB-10
      style={{ borderBottomColor: Colors.grey60, borderBottomWidth: 1 }}
    >
      <View style={{ paddingHorizontal, paddingBottom: 10 }} row spread>
        <TouchableWithoutFeedback onPress={onPressProfile}>
          <View row>
            <FastImage
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: creator.profileImg }}
            ></FastImage>
            <View marginL-10>
              <Text text80BO>{creator.nickname}</Text>
              <Text text90L grey10>
                {creator._count.dateList}번의 데이트
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={onPressDate}>
        <View style={{ width: feedWidth, height: feedWidth }}>
          <View style={{ width: '100%', aspectRatio: 1 }}>
            <Pinchable>
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{
                  uri: mainImg,
                }}
              ></FastImage>
            </Pinchable>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {/* <View row marginT-20 marginB-10 style={{ paddingHorizontal }}>
        <View row center marginR-15>
          <SimpleLine size={20} name="eye" />
          <Text text80L marginL-5>
            {viewCount}
          </Text>
        </View>
        <View row center marginR-15>
          <SimpleLine size={20} name="heart" />
          <Text text80L marginL-5>
            {likeCount}
          </Text>
        </View>
        <View row center>
          <Octicon size={20} name="comment" />
          <Text text80L marginL-5>
            {commentCount}
          </Text>
        </View>
      </View> */}
      <View style={{ paddingHorizontal, paddingTop: 15, paddingBottom: 10 }}>
        <TouchableWithoutFeedback onPress={onPressDate}>
          <View flex row spread marginB-10 style={{ alignItems: 'flex-start' }}>
            <View flex marginR-15>
              <Text text70BO>{title}</Text>
            </View>
            <View row centerV marginT-5>
              <SimpleLine color={Colors.grey30} size={15} name="picture" />
              <Text grey30 marginL-5 text90BO>
                {dateReviewImageCount + 1}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View row marginT-5>
          <View
            paddingH-5
            paddingV-2
            br20
            center
            marginR-5
            style={{ borderColor: Colors.point, borderWidth: 1 }}
          >
            <Text point text90L>
              #{dateSubGroup.name}
            </Text>
          </View>
          <View
            paddingH-5
            paddingV-2
            br20
            center
            style={{ borderColor: Colors.point, borderWidth: 1 }}
          >
            <Text point text90L>
              #
              {parseLocation({
                location: kakaoLocation.addressName,
                index: 1,
              })}
            </Text>
          </View>
        </View>
        <View marginT-5>
          <Text text100L>{moment(createdAt).fromNow()}</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedDateItem;
