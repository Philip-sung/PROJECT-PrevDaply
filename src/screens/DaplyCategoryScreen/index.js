import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  TabBar,
  Button,
  TouchableOpacity,
  Text,
  Colors,
} from 'react-native-ui-lib';
import _ from 'lodash';

import { ScrollView, Alert } from 'react-native';
import { List } from 'immutable';
import FastImage from 'react-native-fast-image';
import {
  colorTheme,
  hp,
  paddingHorizontal,
  paddingVertical,
  Touchable,
} from '../../styles';
import { categoryItemList } from './constants';
import DaplyCategoryItem from './DaplyCategoryItem';
import { daplyActions } from '../../redux/daply';
import { DateLoader } from '../../components/Loader';
import DaplyIcon from '../HomeScreen/DaplyTop/assets/daplyIcon.png';
import DateIcon from '../HomeScreen/DaplyTop/assets/dateIcon.png';
import { ThemeItem } from './styles';
import { HeaderTitle, HeaderTitleWrapper } from '../../styles/main';
import { dateActions } from '../../redux/date';

const tabItems = [
  {
    id: 0,
    value: 'daply',
    label: '플레이리스트',
    icon: DaplyIcon,
    desc: '코스로 즐기는 데이트',
  },
  {
    id: 1,
    value: 'date',
    label: '데이트',
    icon: DateIcon,
    desc: '우리들의 데이트 모음집',
  },
];

const categoryItems = [
  {
    id: 0,
    value: 'situation',
    label: '상황별',
  },
  {
    id: 1,
    value: 'location',
    label: '장소별',
  },
  {
    id: 2,
    value: 'time',
    label: '시간별',
  },
];

const DaplyCategoryScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const { themeList } = useSelector((state) => state.date);
  const [selectedCategoryIndex, setCategoryIndex] = useState(0);
  const [selectedTab, setTab] = useState('daply');
  const isDaply = selectedTab === 'daply';
  console.log(themeList.length);

  useEffect(() => {
    dispatch(dateActions.getThemeList({ isAll: true }));
  }, []);

  const onPressItem = (item) => {
    navigate('DaplyListByCategory', {
      category: item.value,
      categoryName: item.text,
    });
  };

  const onPressDateItem = (item) => {
    navigate('DateListByCategory', {
      theme: item.id,
      themeName: item.name,
    });
  };

  const renderHeader = () => (
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
  );

  const renderContent = () => {
    if (isDaply) {
      return categoryItemList
        .filter((x) => x.tabIndex === selectedCategoryIndex)
        .map((x) => (
          <DaplyCategoryItem
            key={x.value}
            item={x}
            isSelect={false}
            onPressItem={() => onPressItem(x)}
          ></DaplyCategoryItem>
        ));
    }
    return (
      <View centerH row style={{ flexWrap: 'wrap' }}>
        {_.orderBy(themeList, 'id', 'asc').map((x, i) => (
          <Touchable key={x.id} onPress={() => onPressDateItem(x)}>
            <ThemeItem style={{ marginRight: (i + 1) % 3 === 0 ? 0 : 20 }}>
              <FastImage
                style={{ width: 40, height: 40, marginTop: 5 }}
                source={{ uri: x.iconUrl }}
              ></FastImage>
              <Text grey20 text80L marginT-3>
                {x.name}
              </Text>
            </ThemeItem>
          </Touchable>
        ))}
      </View>
    );
  };

  return (
    <>
      <HeaderTitleWrapper>
        <HeaderTitle>카테고리</HeaderTitle>
      </HeaderTitleWrapper>
      <ScrollView stickyHeaderIndices={[0]}>
        <View backgroundColor="white">
          {renderHeader()}
          {isDaply && (
            <View
              flex
              row
              paddingH-20
              marginB-10
              style={{ justifyContent: 'space-around' }}
            >
              {categoryItems.map((x) => (
                <View key={`category-items-${x.value}`}>
                  <Button
                    onPress={() => setCategoryIndex(x.id)}
                    size="small"
                    outline={selectedCategoryIndex !== x.id}
                    label={x.label}
                    labelStyle={{
                      color:
                        selectedCategoryIndex !== x.id
                          ? Colors.secondary
                          : 'white',
                    }}
                    style={{
                      borderColor:
                        selectedCategoryIndex !== x.id
                          ? Colors.secondary
                          : 'transparent',
                      backgroundColor:
                        selectedCategoryIndex === x.id
                          ? Colors.secondary
                          : 'transparent',
                    }}
                  ></Button>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={{ paddingHorizontal }}>{renderContent()}</View>
      </ScrollView>
    </>
  );
};

export default DaplyCategoryScreen;
