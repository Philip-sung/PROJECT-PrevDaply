import moment from 'moment';
import React from 'react';

import { Avatar, View, Text, Colors, Button } from 'react-native-ui-lib';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { Touchable } from '../../../styles';
import CommentItem from '../../DateCommentScreen/CommentItem';

const Comment = ({
  dateComment,
  commentCount,
  onPressCommentMore,
  onPressDeleteComment,
  onPressCommentUser,
}) => {
  const {
    user: { id: userId, profileImg, nickname },
  } = useSelector((state) => state.auth);
  return (
    <View marginT-30>
      {dateComment.map((x) => (
        <CommentItem
          key={`date-detail-comment-${x.id}`}
          user={{ id: userId, profileImg, nickname }}
          comment={x}
          onPressDeleteComment={onPressDeleteComment}
          onPressUser={() => onPressCommentUser(x.user)}
        ></CommentItem>
      ))}
      {commentCount <= 2 ? null : (
        <View marginB-20>
          <Button
            onPress={onPressCommentMore}
            size="medium"
            outline
            label={`${commentCount - 2}개 더보기`}
          ></Button>
        </View>
      )}
    </View>
  );
};

export default Comment;
