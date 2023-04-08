import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { View, TabBar, Button, ActionSheet, Colors } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

import Toast from 'react-native-toast-message';
import ProfileHeader from './ProfileHeader';
import { colorTheme, hp, paddingHorizontal, wp } from '../../styles';
import { dateActions } from '../../redux/date';
import { userActions } from '../../redux/user';
import { DateLoader } from '../../components/Loader';
import HomeDateItem from '../HomeScreen/HomeDateItem';
import DaplyItem from '../../components/DaplyItem';
import { daplyActions } from '../../redux/daply';
import { fetcher, poster } from '../../hooks/requests';
import { API_URL } from '../../constants';

const UserScreen = ({ navigation, route }) => {
  const { navigate, push } = navigation;
  const { params } = route;
  const authState = useSelector((state) => state.auth);
  const dateState = useSelector((state) => state.date);
  const userState = useSelector((state) => state.user);
  const daplyState = useSelector((state) => state.daply);
  const dispatch = useDispatch();
  const { user, loading } = authState;
  const { dateList, dateListLoading, refreshingMyDate } = dateState;
  const { daplyList, daplyListLoading } = daplyState;
  const { userDetail, userDetailLoading, followMap, followerCount } = userState;
  const [selectedRouteIndex, setRouteIndex] = useState(0);
  const [actionVisible, setActionVisible] = useState(false);

  const isMe = user.id === userDetail.id;

  useEffect(
    () => () => {
      dispatch(userActions.initUser());
      dispatch(dateActions.initDateList());
      dispatch(daplyActions.initDaplyList());
    },
    [],
  );

  useEffect(() => {
    if (!params.userId) return;
    dispatch(userActions.getUserDetail(params.userId, params?.from));
  }, [params]);

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

  const renderNotLoggedIn = () => {
    if (loading) return null;
    return <Button onPress={() => navigate('Auth')} label="회원가입"></Button>;
  };

  const onRefresh = () => {
    dispatch(dateActions.refreshDateList(params.userId));
  };

  const onPressFollow = () => {
    if (followMap.id) {
      dispatch(userActions.deleteFollow(followMap));
    } else {
      dispatch(userActions.postFollow(userDetail.id));
    }
  };

  const onPressFollower = () => {
    push('Follower', { userId: userDetail.id });
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;

  const onPressItem = (item) => {
    push('DateDetail', { dateId: item.id });
  };

  const onPressDaply = (id) => {
    push('DaplyDetail', { daplyId: id });
  };

  const renderDateItem = ({ item, index }) => {
    if (dateListLoading) return null;
    return (
      <View marginB-20 width={wp('50%')}>
        <HomeDateItem
          isUser
          date={item}
          index={index}
          onPressDate={() => onPressItem(item)}
        ></HomeDateItem>
      </View>
    );
  };

  const renderDaplyItem = ({ item, index }) => {
    if (dateListLoading) {
      return null;
    }
    return (
      <DaplyItem
        vertical
        width={47}
        index={index}
        key={`user-daply-list-${item.datePlayListId}`}
        title={item.title}
        mainImg={item.mainImg}
        onPress={() => onPressDaply(item.datePlayListId)}
        date={{ kakaoLocation: { addressName: item.addressName } }}
        dateList={item.dateList}
        dateCount={item.dateCount}
        likeCount={item.likeCount}
        favoriteCount={item.favoriteCount}
      ></DaplyItem>
    );
  };

  const renderHeader = () => (
    <>
      <View
        row
        center
        backgroundColor={Colors.white}
        style={{ marginBottom: hp('3%') }}
      >
        <TabBar
          selectedIndex={selectedRouteIndex}
          enableShadow
          onChangeIndex={(idx) => setRouteIndex(idx)}
          indicatorStyle={{
            backgroundColor: colorTheme.primary[300],
          }}
          backgroundColor="transparent"
        >
          <TabBar.Item label="데이트" />
          <TabBar.Item label="플레이리스트" />
        </TabBar>
      </View>
      {dateListLoading && (
        <View flex-1>
          <DateLoader wrapperHeight={40}></DateLoader>
        </View>
      )}
    </>
  );

  const renderContent = () => {
    if (!user.id)
      return (
        <View center height={hp('80%')}>
          {renderNotLoggedIn()}
        </View>
      );

    return (
      <FlatList
        key={selectedRouteIndex}
        refreshControl={
          <RefreshControl
            refreshing={refreshingMyDate}
            onRefresh={onRefresh}
            tintColor={Colors.grey40}
          />
        }
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        data={selectedRouteIndex === 0 ? dateList : daplyList}
        renderItem={selectedRouteIndex === 0 ? renderDateItem : renderDaplyItem}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        keyExtractor={(item) =>
          selectedRouteIndex === 0 ? item.id : item.datePlayListId
        }
      ></FlatList>
    );
  };

  return (
    <View flex-1>
      <ActionSheet
        title="유저 옵션"
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        visible={actionVisible}
        useNativeIOS
        options={[
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
                await poster({
                  url: `${API_URL}/user/report`,
                  body: { userId: userDetail.id },
                });
              } catch (error) {
                console.log(error);
              }
            },
          },
          {
            label: '차단',
            onPress: async () => {
              Toast.show({
                text1: '차단 되었습니다!',
                type: 'success',
                position: 'top',
                topOffset: 100,
              });
              try {
                dispatch(userActions.blockUser(userDetail.id));
              } catch (error) {
                console.log(error);
              }
            },
          },
          {
            label: '취소',
            onPress: () => {},
          },
        ]}
        onDismiss={() => setActionVisible(false)}
      />
      <ProfileHeader
        user={userDetail}
        isMe={isMe}
        onPressFollow={onPressFollow}
        dateCount={dateList.length}
        followerCount={followerCount}
        onPressFollower={onPressFollower}
      ></ProfileHeader>
      {renderContent()}
    </View>
  );
};

export default UserScreen;
