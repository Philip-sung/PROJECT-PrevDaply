import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TabBar, Button } from 'react-native-ui-lib';

import { ScrollView, Alert } from 'react-native';
import { List } from 'immutable';
import {
  colorTheme,
  hp,
  paddingHorizontal,
  paddingVertical,
} from '../../../styles';
import { categoryItemList } from '../../DaplyCategoryScreen/constants';
import DaplyCategoryItem from '../../DaplyCategoryScreen/DaplyCategoryItem';
import { daplyActions } from '../../../redux/daply';
import { DateLoader } from '../../../components/Loader';

const DaplyCategoryScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [selectedCategoryIndex, setCategoryIndex] = useState(0);
  const [_itemList, setItemList] = useState(categoryItemList);
  const { postLoading } = useSelector((state) => state.daply);
  const _selectedCount = _itemList.filter((x) => x.selected).length;

  const onPressItem = (item) => {
    const selectedFiltered = _itemList.filter((x) => x.selected);
    const selectedCount = selectedFiltered.length;
    if (!item.selected && selectedCount >= 2) {
      Alert.alert('2개 이상 선택하실 수 없습니다', '', [{ text: '확인' }]);
    } else {
      const copied = List(_itemList).toJS();
      const targetIndex = copied.findIndex((x) => x.id === item.id);
      const target = copied[targetIndex];
      copied.splice(targetIndex, 1, { ...target, selected: !item.selected });
      setItemList(copied);
    }
  };

  const onPressComplete = () => {
    const selectedFiltered = _itemList.filter((x) => x.selected);
    dispatch(daplyActions.postDaply(selectedFiltered));
  };

  return (
    <View flex-1 style={{ paddingBottom: hp('3%') }}>
      {postLoading ? (
        <DateLoader></DateLoader>
      ) : (
        <>
          <TabBar
            selectedIndex={selectedCategoryIndex}
            enableShadow
            onChangeIndex={(idx) => setCategoryIndex(idx)}
            indicatorStyle={{
              backgroundColor: colorTheme.primary[300],
            }}
            backgroundColor="transparent"
            // tabletMargins={{portrait: 0, landscape: 0}}
          >
            <TabBar.Item label="상황별" />
            <TabBar.Item label="장소별" />
            <TabBar.Item label="시간별" />
          </TabBar>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal,
              paddingVertical,
            }}
          >
            {_itemList
              .filter((x) => x.tabIndex === selectedCategoryIndex)
              .map((x) => (
                <DaplyCategoryItem
                  key={x.value}
                  item={x}
                  onPressItem={() => onPressItem(x)}
                ></DaplyCategoryItem>
              ))}
          </ScrollView>
          <View style={{ paddingHorizontal }}>
            <Button
              disabled={_selectedCount === 0 || postLoading}
              onPress={onPressComplete}
              label="완료"
            ></Button>
          </View>
        </>
      )}
    </View>
  );
};

export default DaplyCategoryScreen;
