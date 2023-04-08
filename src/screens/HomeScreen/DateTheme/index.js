import React from 'react';
import { DotIndicator } from 'react-native-indicators';

import { Card, Text, View, Colors } from 'react-native-ui-lib';
import { hp, Touchable } from '../../../styles';
import HomeDateItem from '../HomeDateItem';

const DateTheme = ({
  dateTopThemeList,
  dateListByThemeLoading,
  activeDateTheme,
  dateListByTheme,
  onPressTheme,
  onPressDate,
}) => (
  <Card paddingV-15 style={{ paddingHorizontal: 10 }}>
    <Text text60BO marginB-15>
      데이트, 지금 핫한 테마는?
    </Text>
    <View row marginB-10>
      {dateTopThemeList.map((x) => (
        <Touchable key={`dateTopTheme-${x.id}`} onPress={() => onPressTheme(x)}>
          <View
            br50
            paddingV-5
            paddingH-10
            marginR-5
            style={{
              borderWidth: 1,
              borderColor:
                activeDateTheme !== x.id ? Colors.secondary : 'transparent',
            }}
            backgroundColor={
              activeDateTheme === x.id ? Colors.secondary : 'white'
            }
          >
            <Text
              color={activeDateTheme !== x.id ? Colors.secondary : 'white'}
              text90M
            >
              #{x.name}
            </Text>
          </View>
        </Touchable>
      ))}
    </View>
    {dateListByThemeLoading ? (
      <View flex height={hp('25%')}>
        <DotIndicator
          color={Colors.secondary}
          size={8}
          count={3}
        ></DotIndicator>
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {dateListByTheme.map((x, i) => (
          <View
            key={x.id}
            style={{
              width: '50%',
              marginBottom: 15,
            }}
          >
            <HomeDateItem
              date={x}
              onPressDate={() => onPressDate(x)}
            ></HomeDateItem>
          </View>
        ))}
      </View>
    )}
  </Card>
);

export default DateTheme;
