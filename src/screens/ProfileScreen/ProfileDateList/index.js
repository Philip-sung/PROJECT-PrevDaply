import React from 'react';
import { View } from 'react-native-ui-lib';
import DateItem from '../../../components/DateItem';
import { wp } from '../../../styles';
import HomeDateItem from '../../HomeScreen/HomeDateItem';

const ProfileDateList = ({ myDateList, onPressDate }) => (
  <>
    {myDateList.map((x, index) => (
      <View key={`user-date-list-${x.id}`} width={wp('50%')}>
        <HomeDateItem
          isUser
          date={x}
          index={index}
          onPressDate={() => onPressDate(x.id)}
        ></HomeDateItem>
      </View>
    ))}
  </>
);

export default ProfileDateList;
