import React from 'react';
import { View, Text, Colors } from 'react-native-ui-lib';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { Touchable } from '../../../styles';
import { renderValue } from '../utils';

export const partTypes = [{ trigger: '@', textStyle: { color: Colors.point } }];

export const CommentPostLoader = ({ user }) => (
  <View>
    <View marginB-10>
      <View row centerV spread>
        <View row centerV>
          <FastImage
            source={{ uri: user.profileImg }}
            style={{ width: 24, height: 24, borderRadius: 12 }}
          ></FastImage>

          <Text text80BL marginL-10>
            {user.nickname}
          </Text>
        </View>
      </View>
      <View
        row
        spread
        padding-10
        backgroundColor={Colors.secondary}
        style={{ opacity: 0.8 }}
        marginT-10
        br20
      >
        <Text white text90R>
          게시중...
        </Text>
      </View>
    </View>
  </View>
);

const CommentItem = ({ comment, onPressUser, user, onPressDeleteComment }) => (
  <View marginB-10>
    <View row centerV spread>
      <Touchable onPress={() => onPressUser(comment.user)}>
        <View row centerV>
          <FastImage
            source={{ uri: comment.user.profileImg }}
            style={{ width: 24, height: 24, borderRadius: 12 }}
          ></FastImage>

          <Text text80BL marginL-10>
            {comment.user.nickname}
          </Text>
        </View>
      </Touchable>
      <Text text90L color={Colors.grey40}>
        {moment(comment.createdAt).fromNow()}
      </Text>
    </View>
    <View row spread padding-10 backgroundColor={Colors.grey70} marginT-10 br20>
      {renderValue(comment.content, partTypes)}
      {comment.user.id === user.id && (
        <Touchable onPress={() => onPressDeleteComment(comment.id)}>
          <AntIcon name="close" size={18} color={Colors.grey40}></AntIcon>
        </Touchable>
      )}
    </View>
  </View>
);

export default CommentItem;
