import React, { memo } from 'react';
import { View, Text, Colors } from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';
import { TextInput } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import { borderRadius, Touchable, wp } from '../../../styles';

export const SearchBar = memo(
  ({ isFocused, searchInput, onPressBack, onCancel, collectionLoading }) => (
    <View
      row
      centerV
      spread
      style={{
        borderColor: Colors.grey50,
        borderBottomWidth: 1,
        borderRadius,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
      }}
    >
      <View row centerV flex>
        <Touchable
          onPress={onPressBack}
          style={{ alignItems: 'center', marginRight: 10 }}
        >
          <AntDesign color={Colors.point} name="left" size={24}></AntDesign>
        </Touchable>
        <Animated.View>
          <TextInput
            returnKeyLabel="검색"
            returnKeyType="search"
            {...searchInput}
          ></TextInput>
        </Animated.View>
      </View>
      {isFocused && (
        <View center>
          {collectionLoading && (
            <DotIndicator
              count={3}
              size={4}
              color={Colors.point}
            ></DotIndicator>
          )}
        </View>
      )}
    </View>
  ),
);
