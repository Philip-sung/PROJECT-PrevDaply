import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import DaplyItem from '../../components/DaplyItem';
import { DateLoader } from '../../components/Loader';
import { daplyActions } from '../../redux/daply';
import {
  mainPaddingVertical,
  paddingHorizontal,
  paddingVertical,
} from '../../styles';
import { MainWrapper } from '../../styles/main';

const DaplyListByCategoryScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const dispatch = useDispatch();
  const { daplyListByCategory, daplyListByCategoryLoading } = useSelector(
    (state) => state.daply,
  );

  useEffect(() => {
    dispatch(daplyActions.getDaplyListByCategory(params.category));
  }, []);

  const onPressDaply = (daplyId) => {
    navigate('DaplyDetail', { daplyId });
  };

  const renderItem = ({ item, index }) => (
    <DaplyItem
      onPress={() => onPressDaply(item.datePlayListId)}
      // onPressProfile={onPressProfile}
      index={index}
      vertical
      width={42}
      mainImg={item.mainImg}
      title={item.title}
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

  if (daplyListByCategoryLoading) {
    return <DateLoader></DateLoader>;
  }

  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      contentContainerStyle={{
        paddingVertical: mainPaddingVertical,
        paddingHorizontal,
      }}
      data={daplyListByCategory}
      renderItem={renderItem}
      keyExtractor={(item) => item.datePlayListId}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
};

export default DaplyListByCategoryScreen;
