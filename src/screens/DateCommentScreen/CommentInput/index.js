import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import { useHeaderHeight } from '@react-navigation/elements';
import { View, Colors, Button, Avatar } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { uniqBy } from 'lodash';

import {
  MentionInput,
  replaceMentionValues,
  parseValue,
} from 'react-native-controlled-mentions';

import { DotIndicator } from 'react-native-indicators';
import { dateActions } from '../../../redux/date';
import {
  paddingHorizontal,
  COMMENT_INPUT_HEIGHT,
  screenWidth,
  COMMENT_INPUT_AVATAR_WIDTH,
  screenHeight,
  colorTheme,
} from '../../../styles';
import { KeyboardWrapper } from '../styles';

import UserListItem from '../../../components/UserListItem';
import { partTypes } from '../CommentItem';
import { userActions } from '../../../redux/user';

const CommentInput = ({ dateId }) => {
  const dispatch = useDispatch();
  const dateState = useSelector((state) => state.date);
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const { postCommentLoading } = dateState;
  const [comment, setComment] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const keyboard = useKeyboard();
  const { keyboardHeight } = keyboard;
  const headerHeight = useHeaderHeight();
  const suggestionContainerHeight =
    screenHeight - (keyboardHeight + COMMENT_INPUT_HEIGHT + headerHeight);

  const {
    user: { profileImg },
    searchedList,
  } = authState;

  const { userSearched, userSearchLoading } = userState;

  const inputValue = {
    value: comment,
    onChange: (txt) => {
      setComment(txt);
    },
    multiline: true,
    placeholder: '댓글 입력...',
    placeholderTextColor: Colors.grey40,
    autoFocus: true,
  };

  useEffect(() => {
    if (userQuery.length > 0 && !userSearchLoading) {
      dispatch(userActions.searchUser(userQuery));
    }
  }, [userQuery]);

  const onPressPostComment = () => {
    const { parts } = parseValue(comment, partTypes);
    const filtered = parts.filter((part) => part.data);
    const mentionList = filtered.map((x) => Number(x.data.id));
    const parsedComment = replaceMentionValues(
      comment,
      ({ name }) => `@${name}`,
    );
    setComment('');
    dispatch(
      dateActions.postDateComment({
        dateId,
        content: comment,
        parsedComment,
        mentionList,
      }),
    );
  };

  const renderSuggestions = ({ keyword, onSuggestionPress }) => {
    if (keyword == null) {
      return null;
    }
    setUserQuery(keyword);
    const combined = uniqBy([...searchedList, ...userSearched], 'id');
    return (
      <ScrollView
        style={{
          position: 'absolute',
          bottom: 41,
          left: -(paddingHorizontal + COMMENT_INPUT_AVATAR_WIDTH + 2),
          width: screenWidth + 1,
          height: suggestionContainerHeight - 81,
          backgroundColor: 'white',
        }}
      >
        {combined
          .filter((one) =>
            one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()),
          )
          .map((one) => (
            <UserListItem
              key={one.id}
              user={{ ...one, nickname: one.name }}
              onPressUser={(_user) => onSuggestionPress(_user)}
            ></UserListItem>
          ))}
      </ScrollView>
    );
  };

  return (
    <KeyboardWrapper>
      <View flex-4 row centerV>
        <View row centerV style={{ paddingLeft: paddingHorizontal }}>
          <View
            style={{
              width: COMMENT_INPUT_AVATAR_WIDTH,
            }}
          >
            <Avatar size={24} source={{ uri: profileImg }}></Avatar>
          </View>
          <View flex centerV>
            <MentionInput
              containerStyle={{
                backgroundColor: 'white',
              }}
              {...inputValue}
              partTypes={[
                {
                  trigger: '@', // Should be a single character like '@' or '#'
                  renderSuggestions,
                  isInsertSpaceAfterMention: true,
                  textStyle: { color: 'black' },
                },
              ]}
            />
          </View>
        </View>
      </View>
      <View flex-1>
        {userSearchLoading ? (
          <DotIndicator
            size={5}
            count={3}
            color={colorTheme.secondary[300]}
          ></DotIndicator>
        ) : (
          <Button
            onPress={onPressPostComment}
            disabled={postCommentLoading || comment.length === 0}
            link
            size="small"
            label="게시"
          ></Button>
        )}
      </View>
    </KeyboardWrapper>
  );
};

export default CommentInput;
