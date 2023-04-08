import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import DateItem from '../../../components/DateItem';
import * as RootNavigation from '../../../routes/navigation';
import { paddingHorizontal } from '../../../styles';

const DateTop = ({ dateTopList }) => {
  const [sliceCount, setSliceCount] = useState(3);
  const onPressDate = (dateId) => {
    RootNavigation.navigate('DateDetail', { dateId });
  };

  const onPressMore = () => {
    if (sliceCount === 3) {
      setSliceCount(10);
    } else {
      setSliceCount(3);
    }
  };

  return (
    <View style={{ paddingHorizontal }}>
      <View row marginV-20 spread>
        <Text text60BL>실시간 데이트 TOP 10</Text>
        <Button
          onPress={onPressMore}
          label={sliceCount === 3 ? '더보기' : '접기'}
          size="small"
          link
        ></Button>
      </View>
      {dateTopList.slice(0, sliceCount).map((x) => (
        <DateItem
          key={`home-date-top-${x.id}`}
          title={x.title}
          mainImg={x.mainImg}
          location={{ addressName: x.addressName }}
          subGroup={{ name: x.name }}
          onPress={() => onPressDate(x.id)}
        ></DateItem>
      ))}
    </View>
  );
};

export default DateTop;
