import React, { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Button, View } from 'react-native-ui-lib';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'immutable';
import { ListHeader } from '..';
import { dateActions } from '../../../redux/date';
import { paddingHorizontal } from '../../../styles';
import { daplyActions } from '../../../redux/daply';
import DateListItem from '../../../components/DateListItem';

const MyDateList = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const { dateIndex } = params;
  const dispatch = useDispatch();

  const { myDateList } = useSelector((state) => state.date);
  const { postingPlayList, postingDaply } = useSelector((state) => state.daply);

  useEffect(() => {
    dispatch(dateActions.getMyDateList());
  }, []);

  const handlePressItem = (item) => {
    const copiedPostingPlayList = List(postingPlayList).toJS();
    const targetDate = postingPlayList[dateIndex];
    copiedPostingPlayList.splice(dateIndex, 1, {
      ...targetDate,
      date: item,
    });
    dispatch(daplyActions.setPostingPlayList(copiedPostingPlayList));
    navigate('DaplyInit');
  };

  const renderItem = useCallback(
    ({ item }) => (
      <DateListItem
        date={item}
        onPressItem={() => handlePressItem(item)}
      ></DateListItem>
    ),
    [],
  );

  return (
    <FlatList
      data={myDateList}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => `myDateList-${item.id}`}
      renderItem={renderItem}
      ListHeaderComponent={
        <View style={{ paddingHorizontal }}>
          <ListHeader
            title={`${postingDaply.title || '플레이리스트'}의`}
            subTitle={params.subTitle}
          ></ListHeader>
        </View>
      }
    ></FlatList>
  );
};

export default MyDateList;
