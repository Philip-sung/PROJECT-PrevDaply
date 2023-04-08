import React from 'react';
import FastImage from 'react-native-fast-image';
import { Card, View, Text } from 'react-native-ui-lib';
import { borderRadius, hp } from '../../../styles';
import checkCircleIcon from '../../../assets/icons/basic-circle-check-outline.png';
import checkedCircleIcon from '../../../assets/icons/basic-circle-check.png';

const DaplyCategoryItem = ({ item, onPressItem, isSelect }) => (
  <Card
    onPress={onPressItem}
    style={{
      width: '100%',
      marginRight: 15,
      marginBottom: hp('2%'),
      borderRadius,
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 10,
    }}
  >
    <View row spread centerV style={{ flex: 1 }} padding-10>
      <View row centerV>
        <FastImage
          style={{ width: 45, height: 45, marginRight: 10 }}
          source={item.iconUrl}
          resizeMode={FastImage.resizeMode.contain}
        ></FastImage>
        <View>
          <Text grey10 text70BO>
            {item.text}
          </Text>
          <Text grey30 text80BO>
            Playlist
          </Text>
        </View>
      </View>

      <View marginT-5>
        {isSelect && (
          <FastImage
            style={{ width: 25, height: 25 }}
            source={!item.selected ? checkCircleIcon : checkedCircleIcon}
            resizeMode={FastImage.resizeMode.contain}
          ></FastImage>
        )}
      </View>
    </View>
  </Card>
);

DaplyCategoryItem.defaultProps = {
  isSelect: true,
};

export default DaplyCategoryItem;
