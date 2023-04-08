import React from 'react';
import DaplyItem from '../../../components/DaplyItem';

const ProfileDaplyList = ({ myDaplyList, onPressDaply }) => (
  <>
    {myDaplyList.map((x, index) => (
      <DaplyItem
        vertical
        index={index}
        key={`user-daply-list-${x.datePlayListId}`}
        title={x.title}
        mainImg={x.mainImg}
        onPress={() => onPressDaply(x.datePlayListId)}
        dateList={x.dateList}
        dateCount={x.dateCount}
        likeCount={x.likeCount}
        favoriteCount={x.favoriteCount}
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
