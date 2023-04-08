import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { DotIndicator } from 'react-native-indicators';

import { paddingHorizontal, colorTheme, ListImageWidth } from '../../styles';

const Loader = ({ keyword }) => (
  <View style={{ paddingHorizontal }} row paddingV-10>
    <View centerV marginR-15>
      <View
        style={{
          width: ListImageWidth,
          height: ListImageWidth,
        }}
      >
        <DotIndicator
          size={3}
          color={colorTheme.secondary[300]}
          count={3}
        ></DotIndicator>
      </View>
    </View>
    <View centerV>
      <Text>{keyword} 검색중...</Text>
    </View>
  </View>
);

export default Loader;
