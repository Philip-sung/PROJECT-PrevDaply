import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { View, TabBar, Button, ActionSheet, Colors } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { authActions } from '~/redux/auth';
import { HeaderTitle, HeaderTitleWrapper } from '~/styles/main';

import ProfileHeader from './ProfileHeader';
import { colorTheme, hp, paddingHorizontal, wp } from '../../styles';
import { dateActions } from '../../redux/date';
import { DateLoader } from '../../components/Loader';
import { daplyActions } from '../../redux/daply';
import HomeDateItem from '../HomeScreen/HomeDateItem';
import DaplyItem from '../../components/DaplyItem';

const ProfileScreen = ({ navigation }) => {
  const { navigate } = navigation;
  const authState = useSelector((state) => state.auth);
  const dateState = useSelector((state) => state.date);
  const daplyState = useSelector((state) => state.daply);
  const dispatch = useDispatch();
  const { user, loading, followingCount, followerCount } = authState;
  const { myDateList, myDateListLoading, refreshingMyDate } = dateState;
  const { myDaplyList } = daplyState;
  const [selectedRouteIndex, setRouteIndex] = useState(0);

  const [postActionVisible, setPostVisible] = useState(false);
  const hasDateList = myDateList.length > 0;

  const postOption = [
    { key: 'date', label: '데이트', onPress: () => navigateToPost() },
    {
      key: 'daply',
      label: '플레이리스트',
      onPress: () => navigateToDaplyInit(),
    },
    { key: 'cancel', label: '취소', onPress: () => {} },
  ];

  const filteredPostOption = hasDateList
    ? postOption
    : postOption.filter((x) => x.key !== 'daply');

  useEffect(() => {
    if (user.id) {
      dispatch(dateActions.getMyDateList());
      dispatch(daplyActions.getMyDaplyList());
    }
  }, [user]);

  const logOut = () => {
    dispatch(authActions.logOutAction());
  };

  const navigateToPost = () => {
    navigate('Post');
  };

  const navigateToDaplyInit = () => {
    navigate('DaplyPostStack');
  };

  const navigateToSetting = () => {
    navigate('Setting');
  };

  const renderHeaderTitle = () => {
    if (loading) return '로딩중';
    if (!user.id) return '프로필';
    return `${user.nickname}`;
  };

  const renderNotLoggedIn = () => {
    if (loading) return null;
    return <Button onPress={() => navigate('Auth')} label="회원가입"></Button>;
  };

  const onRefresh = () => {
    dispatch(dateActions.refreshMyDateList());
  };

  const onPressFollower = () => {
    navigate('Follower');
  };

  const onPressFollowing = () => {
    navigate('Following');
  };

  const onPressAvatar = () => {
    navigate('ProfileEdit');
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) =>
    layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;

  const onPressItem = (item) => {
    navigate('DateDetail', { dateId: item.id });
  };

  const onPressDaply = (id) => {
    navigate('DaplyDetail', { daplyId: id });
  };

  const renderDateItem = ({ item, index }) => {
    if (myDateListLoading) return null;
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
    if (myDateListLoading) {
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
      {myDateListLoading && (
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
        data={selectedRouteIndex === 0 ? myDateList : myDaplyList}
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
        title="포스팅"
        message="포스팅 종류를 선택하세요"
        cancelButtonIndex={hasDateList ? 2 : 1}
        // destructiveButtonIndex={hasDateList ? 2 : 1}
        useNativeIOS
        options={filteredPostOption}
        visible={postActionVisible}
        onDismiss={() => setPostVisible(false)}
      />
      <HeaderTitleWrapper>
        <HeaderTitle>{renderHeaderTitle()}</HeaderTitle>
        {user.id && (
          <View row top>
            <TouchableOpacity
              style={{ marginRight: 5 }}
              onPress={() => setPostVisible(true)}
            >
              <Feather name="plus-square" size={30}></Feather>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToSetting}>
              <Feather name="menu" size={30}></Feather>
            </TouchableOpacity>
          </View>
        )}
      </HeaderTitleWrapper>
      <ProfileHeader
        user={user}
        dateCount={myDateList.length}
        followerCount={followerCount}
        followingCount={followingCount}
        onPressFollower={onPressFollower}
        onPressFollowing={onPressFollowing}
        onPressAvatar={onPressAvatar}
      ></ProfileHeader>
      {renderContent()}
    </View>
  );
};

export default ProfileScreen;
