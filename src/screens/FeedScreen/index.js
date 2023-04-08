import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { View, Colors, Text, TouchableOpacity } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { homeActions } from '../../redux/home';
import { HeaderTitle, HeaderTitleWrapper } from '../../styles/main';
import FeedDateItem from './FeedDateItem';
import FeedDaplyItem from './FeedDaplyItem';
import { hp, colorTheme, bottomTabHeight } from '../../styles';
import DaplyIcon from '../HomeScreen/DaplyTop/assets/daplyIcon.png';
import DateIcon from '../HomeScreen/DaplyTop/assets/dateIcon.png';

const tabItems = [
  {
    id: 0,
    value: 'date',
    label: '데이트',
    icon: DateIcon,
    desc: '우리들의 데이트 모음집',
  },
  {
    id: 1,
    value: 'daply',
    label: '플레이리스트',
    icon: DaplyIcon,
    desc: '코스로 즐기는 데이트',
  },
];

const FeedScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const tabBarHeight = bottomTabHeight;
  const [selectedTab, setTab] = useState('date');
  const isDaply = selectedTab === 'daply';

  const scrollRef = useRef();
  const { feedList, feedLoading, daplyFeedList } = useSelector(
    (state) => state.home,
  );

  useScrollToTop(scrollRef);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = () => {
    dispatch(homeActions.getFeedAction());
    dispatch(homeActions.getDaplyFeedAction());
  };

  const onRefresh = () => {
    getFeed();
  };

  const onPressProfile = (user) => {
    navigate('User', { userId: user.id, nickname: user.nickname });
  };

  const onPressDate = (dateId) => {
    navigate('DateDetail', { dateId });
  };

  const onPressDaply = (daply) => {
    navigate('DaplyDetail', { daplyId: daply.id });
  };

  const renderItem = ({ item }) => (
    <FeedDateItem
      onPressDate={() => onPressDate(item.id)}
      onPressProfile={() => onPressProfile(item.creator)}
      feed={item}
    ></FeedDateItem>
  );

  const renderDaplyItem = ({ item }) => (
    <FeedDaplyItem
      daply={item}
      onPressDaply={() => onPressDaply(item)}
    ></FeedDaplyItem>
  );

  const renderHeader = () => (
    <View flex row marginB-45>
      {tabItems.map((x) => (
        <TouchableOpacity
          onPress={() => setTab(x.value)}
          paddingV-10
          flex-1
          centerH
          key={x.id}
          style={{ position: 'relative' }}
        >
          <View row centerV>
            <FastImage
              style={{ width: 20, height: 20 }}
              source={x.icon}
            ></FastImage>
            <Text text90BO marginL-10 point={x.value === selectedTab}>
              {x.label}
            </Text>
          </View>
          {selectedTab === x.value && (
            <View
              absB
              backgroundColor={colorTheme.primary[300]}
              style={{ width: '90%', height: 2 }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  left: '50%',
                  transform: [{ translateX: -50 }],
                }}
                br50
                paddingV-5
                paddingH-10
                backgroundColor={Colors.yellow60}
              >
                <Text text100L>
                  {tabItems.find((t) => t.value === selectedTab).desc}
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View>
      <HeaderTitleWrapper>
        <HeaderTitle>피드</HeaderTitle>
      </HeaderTitleWrapper>

      <FlatList
        key={selectedTab}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + hp('3%') }}
        refreshControl={
          <RefreshControl
            refreshing={feedLoading}
            onRefresh={onRefresh}
            tintColor={Colors.grey40}
          />
        }
        data={isDaply ? daplyFeedList : feedList}
        renderItem={isDaply ? renderDaplyItem : renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

export default FeedScreen;
