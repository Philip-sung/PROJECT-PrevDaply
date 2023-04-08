import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import Octicon from 'react-native-vector-icons/Octicons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { borderRadius, paddingHorizontal } from '../../styles';
import { MainPhotoItem } from './styles';

const DateListItem = ({ date, onPressItem }) => (
  <TouchableOpacity
    onPress={() => onPressItem(date)}
    style={{
      justifyContent: 'center',
      paddingHorizontal,
      paddingVertical: 10,
    }}
  >
    <View row flex centerV>
      <MainPhotoItem>
        <FastImage
          style={{
            width: '100%',
            height: '100%',
            borderRadius,
          }}
          source={{ uri: date.mainImg }}
          resizeMode={FastImage.resizeMode.cover}
        ></FastImage>
      </MainPhotoItem>
      <View row spread flex centerV>
        <View paddingL-15 column centerV>
          <Text grey20 text70BO>
            {date.title}
          </Text>
          <View row>
            <View centerV row marginR-20>
              <SimpleLine size={15} name="eye" color={Colors.grey40} />
              <Text text80L marginL-5 grey20>
                {date._count.dateView}
              </Text>
            </View>
            <View centerV row marginR-20>
              <SimpleLine size={15} name="heart" color={Colors.grey40} />
              <Text text80L marginL-5 grey20>
                {date._count.dateLike}
              </Text>
            </View>
            <View centerV row>
              <Octicon size={15} name="comment" color={Colors.grey40} />
              <Text text80L marginL-5 grey20>
                {date._count.dateComment}
              </Text>
            </View>
          </View>
          <View marginT-5>
            <Text grey30 text90L>
              {moment(date.createdAt).fromNow()}
            </Text>
          </View>
        </View>
        <Ionicon
          name="chevron-forward"
          size={30}
          color={Colors.grey30}
        ></Ionicon>
      </View>
    </View>
  </TouchableOpacity>
);

export default DateListItem;
