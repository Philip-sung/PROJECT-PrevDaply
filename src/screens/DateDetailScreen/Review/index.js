import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import { Text, View, Colors } from 'react-native-ui-lib';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import { wp } from '../../../styles';
import DateImageSlider from '../../../components/DateImageSlider';
const IconWrapper =
  Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

const Review = ({ dateReview, navigateToEdit, isMine }) => (
  <View>
    {dateReview.map((x) => (
      <View marginB-30 key={`review-${x.id}`}>
        {x.dateReviewImageList.length > 0 && (
          <DateImageSlider list={x.dateReviewImageList}></DateImageSlider>
        )}
        <View flex marginT-35 row spread>
          <View flex-1>
            <Text grey10 text80>
              {x.content}
            </Text>
          </View>
          {isMine && x.content.length !== 0 ? (
            <View
              style={{
                alignItems: 'flex-end',
              }}
              width={wp('9%')}
              paddingT-10
            >
              <IconWrapper onPress={() => navigateToEdit(x)}>
                <SimpleLine
                  name="pencil"
                  size={18}
                  color={Colors.grey40}
                ></SimpleLine>
              </IconWrapper>
            </View>
          ) : null}
        </View>
      </View>
    ))}
  </View>
);

export default Review;
