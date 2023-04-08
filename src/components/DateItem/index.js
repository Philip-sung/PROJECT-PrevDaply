import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, Card, Colors } from 'react-native-ui-lib';
import { borderRadius, hp, wp } from '../../styles';
import { parseLocation } from '../../utils/location';

const DateItem = ({
  width,
  title,
  mainImg,
  onPress,
  vertical,
  index,
  subGroup,
  location,
}) => {
  const isEven = vertical && index % 2 !== 0;
  return (
    <Card
      enableShadow={false}
      onPress={onPress}
      style={{
        width: '100%',
        marginRight: 15,
        marginBottom: hp('1%'),
        borderRadius,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.grey60,
      }}
    >
      <View style={{ width: wp('25%'), aspectRatio: 1 }}>
        <FastImage
          style={{
            width: '100%',
            height: '100%',
            borderRadius,
          }}
          source={{
            uri: mainImg,
          }}
        ></FastImage>
      </View>
      <View centerV style={{ flex: 1 }} padding-10>
        <Text grey10 text80BO>
          {title}
        </Text>
        <View row marginT-5>
          <Text text90BL grey30 marginR-5>
            #{subGroup.name}
          </Text>
          <Text text90BL grey30>
            #{parseLocation({ location: location.addressName, index: 1 })}
          </Text>
        </View>
      </View>
    </Card>
  );
};

DateItem.defaultProps = {
  width: 40,
  vertical: true,
  index: 0,
  subGroup: {
    name: '',
  },
};

export default DateItem;
