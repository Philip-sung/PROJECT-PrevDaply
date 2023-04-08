import React from 'react';
import DateItem from '../../../components/DateItem';

const ProfileDateList = ({ dateList, onPressDate }) => (
  <>
    {dateList.map((x, index) => (
      <DateItem
        width={42}
        vertical
        index={index}
        key={`user-date-list-${x.id}`}
        title={x.title}
        mainImg={x.mainImg}
        location={x.kakaoLocation}
        subGroup={x.dateSubGroup}
        onPress={() => onPressDate(x.id)}
      ></DateItem>
    ))}
  </>
);

export default ProfileDateList;
