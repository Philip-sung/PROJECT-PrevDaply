import React from 'react';
import { ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { DotIndicator } from 'react-native-indicators';
import { Card, Colors, Text, View } from 'react-native-ui-lib';
import { hp } from '../../../styles';
import feelingConfig from '../../Post/FeelingScreen/constants';
import HomeDateItem from '../HomeDateItem';

const FeelingTop = ({
  activeDateFeeling,
  onPressFeeling,
  dateListByFeeling,
  dateListByFeelingLoading,
  onPressDate,
}) => {
  const a = '';
  return (
    <Card paddingV-15 style={{ paddingHorizontal: 10 }}>
      <Text text60BO marginB-15>
        기분 따라 가는 우리의 데이트
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          marginBottom: 10,
          padding: 10,
        }}
      >
        {feelingConfig.map((x) => (
          <Card
            onPress={() => onPressFeeling(x.value)}
            key={`feeling-${x.value}`}
            padding-20
            marginR-10
            center
          >
            <FastImage
              style={{ width: 30, height: 30 }}
              source={x.path}
            ></FastImage>
            <Text
              marginT-5
              text80BL
              color={
                activeDateFeeling === x.value ? Colors.secondary : Colors.text
              }
            >
              {x.text}
            </Text>
          </Card>
        ))}
      </ScrollView>
      <View br50 paddingV-5 paddingH-10 backgroundColor={Colors.yellow60}>
        <Text text100L>
          {feelingConfig.find((x) => x.value === activeDateFeeling).desc}
        </Text>
      </View>
      <View paddingT-10>
        {dateListByFeelingLoading ? (
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
            {dateListByFeeling.map((x, i) => (
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
      </View>
    </Card>
  );
};

export default FeelingTop;
