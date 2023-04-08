import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, Avatar } from 'react-native-ui-lib';

import { CreatorWrapper, CreatorContent, CreatorInfo } from './styles';

const Creator = ({ creator, creatorDateCount, onPress }) => {
  const { profileImg, nickname } = creator;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <CreatorWrapper>
        <CreatorContent>
          <Avatar
            size={40}
            source={{
              uri: profileImg,
            }}
          ></Avatar>
          <CreatorInfo>
            <Text text80BL>{nickname}</Text>
            <Text text90L>{creatorDateCount}번의 데이트</Text>
          </CreatorInfo>
        </CreatorContent>
      </CreatorWrapper>
    </TouchableWithoutFeedback>
  );
};

export default Creator;
