import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { View, TabBar } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import DaplyItem from '../../components/DaplyItem';
import { authActions } from '../../redux/auth';
import {
  colorTheme,
  mainPaddingVertical,
  paddingHorizontal,
  wp,
} from '../../styles';
import HomeDateItem from '../HomeScreen/HomeDateItem';

const FavoriteScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const [selectedRouteIndex, setRouteIndex] = useState(0);
  const isDate = selectedRouteIndex === 0;
  const { favoriteDate, favoriteDaply } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authActions.getFavorite());
  }, []);

  const renderHeader = () => (
    <TabBar
      selectedIndex={selectedRouteIndex}
      enableShadow
      onChangeIndex={(idx) => setRouteIndex(idx)}
      style={{ marginBottom: mainPaddingVertical }}
      indicatorStyle={{
        backgroundColor: colorTheme.primary[300],
      }}
      backgroundColor="white"
      // tabletMargins={{portrait: 0, landscape: 0}}
    >
      <TabBar.Item label="데이트" />
      <TabBar.Item label="플레이리스트" />
    </TabBar>
  );

  const onPressItem = (item) => {
    navigate('DateDetail', { dateId: item.id });
  };

  const onPressDaply = (id) => {
    navigate('DaplyDetail', { daplyId: id });
  };

  const renderDateItem = ({ item, index }) => (
    <View marginB-20 width={wp('50%')}>
      <HomeDateItem
        date={item}
        index={index}
        onPressDate={() => onPressItem(item)}
      ></HomeDateItem>
    </View>
  );

  const renderDaplyItem = ({ item, index }) => (
    <DaplyItem
      vertical
      width={46}
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
      user={{
        userId: item.userId,
        nickname: item.nickname,
        profileImg: item.profileImg,
        userDateCount: item.userDateCount,
      }}
    ></DaplyItem>
  );

  return (
    <FlatList
      key={isDate}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      data={isDate ? favoriteDate : favoriteDaply}
      renderItem={isDate ? renderDateItem : renderDaplyItem}
      ListHeaderComponent={renderHeader}
      stickyHeaderIndices={[0]}
      keyExtractor={(item) => (isDate ? item.id : item.datePlayListId)}
    ></FlatList>
  );
};

export default FavoriteScreen;
