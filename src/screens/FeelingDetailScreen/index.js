import React, { useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { MainWrapper } from '../../styles/main';
import { dateActions } from '../../redux/date';
import { hp, paddingHorizontal, screenWidth } from '../../styles';
import DateItem from '../../components/DateItem';
import {
  HeaderContent,
  HeaderWrapper,
  Overlay,
} from '../DateDetailScreen/Cover/styles';

const FeelingDetailScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const dispatch = useDispatch();
  const { dateFeelingList, dateFeelingCover } = useSelector(
    (state) => state.date,
  );

  useEffect(() => {
    dispatch(dateActions.getFeelingDetail(params.feelingType));
  }, []);

  const ListHeader = () => (
    <HeaderWrapper style={{ marginBottom: hp('5%') }}>
      <HeaderContent>
        <Text
          text30
          style={{
            fontFamily: 'GangwonEduSaeeum-OTFMedium',
          }}
          color="white"
        >
          {route.params.feelingName} 하는 데이트
        </Text>
      </HeaderContent>
      <Overlay>
        <FastImage
          source={{ uri: dateFeelingCover }}
          style={{ flex: 1 }}
          resizeMode="cover"
        ></FastImage>
      </Overlay>
    </HeaderWrapper>
  );

  const onPressItem = (item) => {
    navigate('DateDetail', { dateId: item.id });
  };

  const renderItem = ({ item, index }) => (
    <View style={{ paddingHorizontal }}>
      <DateItem
        onPress={() => onPressItem(item)}
        index={index}
        title={item.title}
        mainImg={item.mainImg}
        subGroup={item.dateSubGroup}
        location={item.kakaoLocation}
      ></DateItem>
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={dateFeelingList}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
};

export default FeelingDetailScreen;
