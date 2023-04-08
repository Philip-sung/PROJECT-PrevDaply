import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Text, View, ActionSheet, Colors, Button } from 'react-native-ui-lib';
import Octicon from 'react-native-vector-icons/Octicons';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';

import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Pinchable from 'react-native-pinchable';
import Toast from 'react-native-toast-message';
import {
  borderRadius,
  colorTheme,
  shadowConfig,
  Touchable,
} from '../../styles';
import {
  AddFav,
  Like,
  ContentWrapper,
  LocationWrapper,
  LocationInfo,
  TagWrapper,
} from './styles';
import Cover from './Cover';
import Creator from './Creator';
import { dateActions } from '../../redux/date';
import Review from './Review';
import Comment from './Comment';
import { confirmAlert } from '../../utils';
import { DateLoader } from '../../components/Loader';
import { fetcher, poster } from '../../hooks/requests';
import { API_URL } from '../../constants';

const DateDetailScreen = ({ navigation, route }) => {
  const { navigate, push } = navigation;
  const { params } = route;
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth);
  const dateState = useSelector((state) => state.date);
  const {
    user: { id },
  } = userState;
  const { date, postLoading, dateLoading, deleteLoading } = dateState;
  const [actionVisible, setActionVisible] = useState(false);
  const viewRef = useRef(null);

  const {
    id: dateId,
    title,
    mainImg,
    createdAt,
    creator,
    creatorId,
    creatorDateCount,
    dateReview,
    kakaoLocation,
    hasLiked,
    hasAdded,
    likeCount,
    viewCount,
    dateSubGroup,
    dateComment,
    commentCount,
  } = date;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setActionVisible(true)}
          style={{ marginRight: 10 }}
        >
          <Feather size={24} name="more-horizontal"></Feather>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!params.dateId) return;
    dispatch(dateActions.getDate(params.dateId));
  }, [params.dateId]);

  // useEffect(() => {
  //   if (prevPostCommentLoading && !postCommentLoading) {
  //     // viewRef.current.scrollToEnd({ animated: true });
  //   }
  // }, [postCommentLoading]);

  const navigateToEdit = (item) => {
    navigate('DateEdit', { dateReview: item });
  };

  const deletePost = () => {
    // console.log(dateId);
    dispatch(dateActions.deleteDate(dateId));
  };

  const onPressLike = () => {
    if (hasLiked) {
      dispatch(dateActions.deleteDateLike(dateId));
    } else {
      dispatch(dateActions.postDateLike(dateId));
    }
  };

  const onPressFav = () => {
    if (hasAdded) {
      dispatch(dateActions.deleteDateFavorite(dateId));
    } else {
      dispatch(dateActions.postDateFavorite(dateId));
    }
  };

  const myOptions = {
    cancelButtonIndex: 3,
    destructiveButtonIndex: 1,
    options: [
      {
        label: '삭제',
        onPress: () => deletePost(),
      },
      {
        label: '취소',
        onPress: () => {},
      },
    ],
  };

  const otherOptions = {
    cancelButtonIndex: 3,
    destructiveButtonIndex: 1,
    options: [
      {
        label: '신고',
        onPress: async () => {
          Toast.show({
            text1: '신고가 접수되었습니다!',
            type: 'success',
            position: 'top',
            topOffset: 100,
          });
          await poster({ url: `${API_URL}/date/report`, body: { dateId } });
        },
      },
      {
        label: '취소',
        onPress: () => {},
      },
    ],
  };

  const onPressLikeCount = () => {
    navigate('DateLike', { dateId, title });
  };

  const onPressCommentUser = (_creator) => {
    push('User', { userId: _creator.id, nickname: _creator.nickname });
  };

  const onPressCommentMore = () => {
    navigate('DateComment', { title, dateId, mainImg, createdAt });
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

  const openWebview = () => {
    navigate('Webview', { uri: kakaoLocation.placeUrl });
  };

  const onPressCreator = () => {
    push('User', { userId: creatorId, nickname: creator.nickname });
  };

  const isMine = id === creatorId;

  const actionSheetOptions = isMine ? myOptions : otherOptions;

  return (
    <ScrollView keyboardShouldPersistTaps="handled" ref={viewRef}>
      <ActionSheet
        useNativeIOS
        visible={actionVisible}
        onDismiss={() => setActionVisible(false)}
        {...actionSheetOptions}
      />
      {dateLoading || postLoading || deleteLoading ? (
        <DateLoader></DateLoader>
      ) : (
        <View>
          <Cover
            title={title}
            mainImg={mainImg}
            createdAt={createdAt}
            likeCount={likeCount}
            viewCount={viewCount}
            commentCount={commentCount}
            onPressLikeCount={onPressLikeCount}
            onPressCommentCount={onPressCommentMore}
          ></Cover>
          <View>
            <TouchableOpacity onPress={onPressFav}>
              <AddFav
                style={{
                  ...shadowConfig,
                  backgroundColor: hasAdded ? colorTheme.primary[300] : 'white',
                }}
              >
                <AntIcon
                  name="star"
                  size={24}
                  color={hasAdded ? 'white' : Colors.yellow40}
                ></AntIcon>
              </AddFav>
            </TouchableOpacity>
            <TouchableOpacity>
              <Like
                onPress={onPressLike}
                style={{
                  ...shadowConfig,
                  backgroundColor: hasLiked ? colorTheme.primary[300] : 'white',
                }}
              >
                <AntIcon
                  name={hasLiked ? 'heart' : 'hearto'}
                  size={24}
                  color={hasLiked ? 'white' : colorTheme.primary[300]}
                ></AntIcon>
              </Like>
            </TouchableOpacity>
            <ContentWrapper>
              <Creator
                onPress={onPressCreator}
                creator={creator}
                creatorDateCount={creatorDateCount}
              ></Creator>
              <View marginT-10>
                <Pinchable>
                  <FastImage
                    source={{ uri: mainImg }}
                    style={{
                      width: '100%',
                      aspectRatio: 1,
                      borderRadius,
                    }}
                  ></FastImage>
                </Pinchable>
              </View>
              <LocationWrapper>
                <View>
                  <MCIcon
                    name="map-marker"
                    size={20}
                    color={colorTheme.primary[300]}
                  ></MCIcon>
                </View>
                <LocationInfo>
                  <Text text80BL>{kakaoLocation.placeName}</Text>
                  <Text text90L>{kakaoLocation.addressName}</Text>
                </LocationInfo>
                <View>
                  <Button
                    onPress={openWebview}
                    backgroundColor="#fee500"
                    color="#000000"
                    size="small"
                    label="kakao"
                  ></Button>
                </View>
              </LocationWrapper>
              <View marginT-20>
                <Review
                  isMine={isMine}
                  dateReview={dateReview}
                  navigateToEdit={navigateToEdit}
                ></Review>
              </View>
              <View row>
                <TagWrapper>
                  <Text point text90L>{`#${dateSubGroup.name}`}</Text>
                </TagWrapper>
              </View>
              <Comment
                dateComment={dateComment}
                commentCount={commentCount}
                onPressCommentUser={onPressCommentUser}
                onPressCommentMore={onPressCommentMore}
                onPressDeleteComment={onPressDeleteComment}
              ></Comment>
              <View row marginT-10>
                <View row center marginR-15>
                  <SimpleLine size={20} name="eye" color={Colors.grey20} />
                  <Text text80L marginL-5 color={Colors.grey20}>
                    {viewCount}
                  </Text>
                </View>
                <Touchable onPress={onPressLikeCount}>
                  <View row center marginR-15>
                    <SimpleLine size={20} name="heart" color={Colors.grey20} />
                    <Text text80L marginL-5 color={Colors.grey20}>
                      {likeCount}
                    </Text>
                  </View>
                </Touchable>
                <Touchable onPress={onPressCommentMore}>
                  <View row center>
                    <Octicon size={20} name="comment" color={Colors.point} />
                    <Text text80L marginL-5 color={Colors.point}>
                      {commentCount}
                    </Text>
                  </View>
                </Touchable>
              </View>
            </ContentWrapper>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default DateDetailScreen;
