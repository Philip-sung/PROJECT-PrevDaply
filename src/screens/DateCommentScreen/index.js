import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';

import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';

import { dateActions } from '../../redux/date';
import {
  paddingHorizontal,
  mainPaddingVertical,
  COMMENT_INPUT_HEIGHT,
} from '../../styles';
import { confirmAlert } from '../../utils';
import { CommentLoader } from '../../components/Loader';
import { userActions } from '../../redux/user';
import { authActions } from '../../redux/auth';
import CommentItem, { CommentPostLoader } from './CommentItem';
import CommentInput from './CommentInput';
import Cover from './Cover';

const DateCommentScreen = ({ navigation, route }) => {
  const { push, navigate, pop } = navigation;
  const { params } = route;
  const { dateId } = params;
  const dispatch = useDispatch();
  const dateState = useSelector((state) => state.date);
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);

  const { commentList, getCommentLoading, postCommentLoading } = dateState;

  const {
    user: { id, profileImg, nickname },
  } = authState;

  const { userSearchLoading } = userState;

  useEffect(() => {
    dispatch(dateActions.getDateComment(dateId));
    dispatch(userActions.getFollowingList());
    dispatch(authActions.getSearchUserView());
  }, [params.dateId]);

  const onPressUser = (_creator) => {
    push('User', { userId: _creator.id, nickname: _creator.nickname });
  };

  const onPressCover = () => {
    if (params.from && params.from === 'noti') {
      navigate('DateDetail', { dateId });
    } else {
      pop();
    }
  };

  const onPressDeleteComment = (commentId) => {
    confirmAlert({
      title: '댓글을 삭제하시겠습니까?',
      message: '되돌릴 수 없습니다',
      onConfirm: () =>
        dispatch(dateActions.deleteDateComment({ commentId, dateId })),
      onCancel: () => {},
    });
  };

  const renderScrollable = (panHandlers) => (
    <ScrollView
      keyboardDismissMode="interactive"
      {...panHandlers}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingHorizontal,
        paddingTop: mainPaddingVertical,
        paddingBottom: 2 * COMMENT_INPUT_HEIGHT,
      }}
    >
      {postCommentLoading && (
        <CommentPostLoader
          user={{ id, profileImg, nickname }}
        ></CommentPostLoader>
      )}
      {!userSearchLoading &&
        commentList.map((item) => (
          <CommentItem
            key={`date-comment-${item.id}`}
            postLoading={postCommentLoading}
            user={{ id, profileImg, nickname }}
            comment={item}
            onPressUser={onPressUser}
            onPressDeleteComment={onPressDeleteComment}
          ></CommentItem>
        ))}
    </ScrollView>
  );

  return (
    <View flex-1>
      <Cover
        title={params.title}
        createdAt={params.createdAt}
        mainImg={params.mainImg}
        onPress={onPressCover}
      ></Cover>
      {getCommentLoading ? (
        <CommentLoader></CommentLoader>
      ) : (
        <>
          <KeyboardAccessoryView
            renderScrollable={renderScrollable}
            contentContainerStyle={{ marginBottom: 1 }}
            contentOffsetKeyboardOpened={-COMMENT_INPUT_HEIGHT}
          >
            <CommentInput dateId={dateId}></CommentInput>
          </KeyboardAccessoryView>
        </>
      )}
    </View>
  );
};

export default DateCommentScreen;
