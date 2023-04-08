import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import {
  View,
  ActionSheet,
  Colors,
  Text,
  TouchableOpacity,
} from 'react-native-ui-lib';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import Pinchable from 'react-native-pinchable';

import {
  borderRadius,
  colorTheme,
  paddingHorizontal,
  paddingVertical,
} from '../../styles';
import { ContentWrapper } from './styles';
import Creator from './Creator';
import { daplyActions } from '../../redux/daply';
import { DateLoader } from '../../components/Loader';
import { usePrevious } from '../../hooks/utils';
import DateTimeline from './DateTimeline';
import { fetcher, poster } from '../../hooks/requests';
import { API_URL } from '../../constants';

const DaplyDetailScreen = ({ navigation, route }) => {
  const { navigate, push } = navigation;
  const { params } = route;
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth);
  const daplyState = useSelector((state) => state.daply);
  const {
    user: { id },
  } = userState;
  const {
    daplyDetail,
    daplyDetailLoading,
    postLoading,
    deleteLoading,
    postCommentLoading,
  } = daplyState;
  const [actionVisible, setActionVisible] = useState(false);
  const viewRef = useRef(null);
  const prevPostCommentLoading = usePrevious(postCommentLoading);

  const {
    id: daplyId,
    title,
    mainImg,
    createdAt,
    creator,
    creatorId,
    creatorDateCount,
    dateList,
    hasLiked,
    likeCount,
    viewCount,
    favoriteCount,
    hasAdded,
  } = daplyDetail;

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
    if (!params.daplyId) return;
    dispatch(daplyActions.getDaply(params.daplyId));
  }, [params.daplyId]);

  useEffect(() => {
    if (prevPostCommentLoading && !postCommentLoading) {
      viewRef.current.scrollToEnd({ animated: true });
    }
  }, [postCommentLoading]);

  const deletePost = () => {
    // console.log(daplyId);
    dispatch(daplyActions.deleteDaply(daplyId));
  };

  const onPressFavorite = () => {
    if (hasAdded) {
      dispatch(daplyActions.deleteDaplyFavorite(daplyId));
    } else {
      dispatch(daplyActions.postDaplyFavorite(daplyId));
    }
  };

  const onPressLike = () => {
    if (hasLiked) {
      dispatch(daplyActions.deleteDaplyLike(daplyId));
    } else {
      dispatch(daplyActions.postDaplyLike(daplyId));
    }
  };

  const myOptions = {
    cancelButtonIndex: 3,
    destructiveButtonIndex: 1,
    options: [
      {
        label: '수정',
        onPress: () => {},
      },
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
          try {
            await poster({ url: `${API_URL}/daply/report`, body: { daplyId } });
          } catch (error) {
            console.log(JSON.stringify(error));
          }
        },
      },
      {
        label: '취소',
        onPress: () => {},
      },
    ],
  };

  const onPressLikeCount = () => {
    navigate('DateLike', { daplyId, title });
  };

  const onPressCreator = () => {
    push('User', { userId: creatorId, nickname: creator.nickname });
  };

  const onPressDateTimeline = (x) => {
    push('DateDetail', { dateId: x.date.id });
  };

  const isMine = id === creatorId;

  const actionSheetOptions = isMine ? myOptions : otherOptions;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={30}
      ref={viewRef}
      contentContainerStyle={{ paddingVertical }}
    >
      <ActionSheet
        useNativeIOS
        visible={actionVisible}
        onDismiss={() => setActionVisible(false)}
        {...actionSheetOptions}
      />
      {daplyDetailLoading || postLoading || deleteLoading ? (
        <DateLoader></DateLoader>
      ) : (
        <View>
          <Pinchable>
            <View style={{ paddingHorizontal, aspectRatio: 1 }}>
              <FastImage
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius,
                }}
                source={{ uri: mainImg }}
              ></FastImage>
            </View>
          </Pinchable>
          <View>
            <ContentWrapper>
              <View row marginV-10>
                <Text text65BL>{title}</Text>
              </View>
              <View flex row spread centerV>
                <Creator
                  onPress={onPressCreator}
                  creator={creator}
                  creatorDateCount={creatorDateCount}
                ></Creator>
                <View row centerV>
                  <TouchableOpacity
                    row
                    centerV
                    style={{ marginRight: 10 }}
                    onPress={onPressLike}
                  >
                    <SimpleLine size={20} name="eye" color={Colors.grey30} />
                    <Text grey30 text90L marginL-5>
                      {viewCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    row
                    centerV
                    style={{ marginRight: 10 }}
                    onPress={onPressLike}
                  >
                    <AntIcon
                      name={hasLiked ? 'heart' : 'hearto'}
                      size={18}
                      color={colorTheme.primary[300]}
                    ></AntIcon>
                    <Text grey30 text90L marginL-5>
                      {likeCount}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity row centerV onPress={onPressFavorite}>
                    <AntIcon
                      name={hasAdded ? 'star' : 'staro'}
                      size={18}
                      color={Colors.yellow40}
                    ></AntIcon>
                    <Text grey30 text90L marginL-5>
                      {favoriteCount}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View marginT-20>
                <DateTimeline
                  dateList={dateList}
                  onPressDateTimeline={onPressDateTimeline}
                ></DateTimeline>
              </View>
            </ContentWrapper>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default DaplyDetailScreen;
