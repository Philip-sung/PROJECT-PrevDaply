import React from 'react';
import DaplyItem from '../../../components/DaplyItem';

const ProfileDaplyList = ({ daplyList, onPressDaply }) => (
  <>
    {daplyList.map((x, index) => (
      <DaplyItem
        vertical
        index={index}
        key={`user-daply-list-${x.datePlayListId}`}
        title={x.title}
        mainImg={x.mainImg}
        date={{ kakaoLocation: { addressName: x.addressName } }}
        dateList={x.dateList}
        dateCount={x.dateCount}
        likeCount={x.likeCount}
        favoriteCount={x.favoriteCount}
        onPress={() => onPressDaply(x.datePlayListId)}
        user={{
          userId: x.userId,
          nickname: x.nickname,
          profileImg: x.profileImg,
          userDateCount: x.userDateCount,
        }}
      ></DaplyItem>
    ))}
  </>
);

export default ProfileDaplyList;
