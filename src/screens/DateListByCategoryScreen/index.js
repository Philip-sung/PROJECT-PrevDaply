import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { DateLoader } from '../../components/Loader';
import { dateActions } from '../../redux/date';
import { mainPaddingVertical, paddingHorizontal, wp } from '../../styles';
import DateItemByTheme from './DateItemByTheme';

const DateListByCategoryScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const dispatch = useDispatch();
  const { dateListByTheme, dateListByThemeLoading } = useSelector(
    (state) => state.date,
  );

  useEffect(() => {
    dispatch(dateActions.getDateListByTheme(params.theme));
  }, []);

  const onPressDate = (date) => {
    navigate('DateDetail', { dateId: date.id });
  };

  const renderItem = ({ item, index }) => (
    <View style={{ width: wp('42%') }} marginB-20>
      <DateItemByTheme onPressDate={onPressDate} date={item}></DateItemByTheme>
    </View>
  );

  if (dateListByThemeLoading) {
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
      data={dateListByTheme}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
};

export default DateListByCategoryScreen;
