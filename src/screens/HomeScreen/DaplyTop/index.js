import React, { useState } from 'react';
import { Animated, ScrollView } from 'react-native';
import {
  Text,
  View,
  Colors,
  Card,
  TabController,
  TouchableOpacity,
} from 'react-native-ui-lib';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import ContentLoader from 'react-content-loader/native';
import DaplyItem from '../../../components/DaplyItem';
import {
  borderRadius,
  colorTheme,
  wp,
  hp,
  paddingHorizontal,
  paddingVertical,
  Touchable,
} from '../../../styles';
import { categoryItemList } from '../../DaplyCategoryScreen/constants';
import * as RootNavigation from '../../../routes/navigation';
import DaplyIcon from './assets/daplyIcon.png';
import DateIcon from './assets/dateIcon.png';
import HomeDateItem from '../HomeDateItem';

const tabItems = [
  {
    id: 0,
    value: 'date',
    label: '데이트',
    icon: DateIcon,
    desc: '우리들의 데이트 모음집',
  },
  {
    id: 1,
    value: 'daply',
    label: '플레이리스트',
    icon: DaplyIcon,
    desc: '코스로 즐기는 데이트',
  },
];

const DaplyTop = ({
  dateTopList,
  daplyTopList,
  onPressDate,
  onPressProfile,
  dateTopLoading,
  daplyTopLoading,
}) => {
  const [selectedTab, setTab] = useState('date');
  const onPressDaply = (id) => {
    RootNavigation.navigate('DaplyDetail', { daplyId: id });
  };

  const renderContent = () => {
    if (daplyTopLoading || dateTopLoading) {
      return <ContentLoader></ContentLoader>;
    }
    switch (selectedTab) {
      case 'daply':
        return daplyTopList.map((x, i) => (
          <DaplyItem
            onPress={() => onPressDaply(x.datePlayListId)}
            onPressProfile={onPressProfile}
            displayRank
            key={`daply-top-item-${x.datePlayListId}`}
            index={i}
            vertical={false}
            width={50}
            mainImg={x.mainImg}
            title={x.title}
            date={{ kakaoLocation: { addressName: x.addressName } }}
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
        ));

      case 'date':
        return dateTopList.map((x, i) => (
          <View key={x.id} width={wp('50%')} marginR-15>
            <HomeDateItem
              date={x}
              index={i}
              displayRank
              onPressDate={onPressDate}
            ></HomeDateItem>
          </View>
        ));

      default:
        return <View></View>;
    }
  };

  return (
    <Card paddingV-15 style={{ paddingHorizontal: 10 }}>
      <Text text60BO marginB-15>
        실시간 인기데이트 TOP 10
      </Text>
      <View flex row marginB-45>
        {tabItems.map((x) => (
          <TouchableOpacity
            onPress={() => setTab(x.value)}
            paddingV-10
            flex-1
            centerH
            key={x.id}
            style={{ position: 'relative' }}
          >
            <View row centerV>
              <FastImage
                style={{ width: 20, height: 20 }}
                source={x.icon}
              ></FastImage>
              <Text text90BO marginL-10 point={x.value === selectedTab}>
                {x.label}
              </Text>
            </View>
            {selectedTab === x.value && (
              <View
                absB
                backgroundColor={colorTheme.primary[300]}
                style={{ width: '90%', height: 2 }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: '50%',
                    transform: [{ translateX: -50 }],
                  }}
                  br50
                  paddingV-5
                  paddingH-10
                  backgroundColor={Colors.yellow60}
                >
                  <Text text100L>
                    {tabItems.find((t) => t.value === selectedTab).desc}
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </Card>
  );
};

export default DaplyTop;
