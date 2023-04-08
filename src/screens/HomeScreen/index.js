import React, { useEffect, useRef } from 'react';
import { Colors, View } from 'react-native-ui-lib';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useScrollToTop } from '@react-navigation/native';
import { getItemFromAsync, removeItemToAsync } from '../../hooks/requests';
import { HeaderTitleWrapper } from '../../styles/main';
import { homeActions } from '../../redux/home';
import { hp, Touchable, bottomTabHeight } from '../../styles';
import { BellActiveDot } from './styles';
import DaplyTop from './DaplyTop';
import TitleLogo from '../../components/TitleLogo';
import FeelingTop from './FeelingTop';
import DateTheme from './DateTheme';
import feelingConfig from '../Post/FeelingScreen/constants';

const HomeScreen = ({ navigation }) => {
  const { navigate, push } = navigation;
  const dispatch = useDispatch();
  const {
    dateTopList,
    daplyTopList,
    dateTopLoading,
    daplyTopLoading,
    dateTopThemeList,
    activeDateTheme,
    activeDateFeeling,
    dateListByTheme,
    dateListByThemeLoading,
    dateListByFeeling,
    dateListByFeelingLoading,
  } = useSelector((state) => state.home);
  const { mainBellActive } = useSelector((state) => state.noti);
  const tabBarHeight = bottomTabHeight;
  const scrollRef = useRef();

  useEffect(async () => {
    const from = await getItemFromAsync('from');
    if (from) {
      navigate(from);
      removeItemToAsync('from');
    }
  }, []);

  const onRefresh = () => {
    getData();
  };

  const getData = () => {
    dispatch(homeActions.getDaplyTopAction());
    dispatch(homeActions.getDateTopAction());
    dispatch(homeActions.getDateTopThemeAction({ isAll: false }));
    dispatch(homeActions.getDateByFeelingAction(feelingConfig[0].value));
  };

  useScrollToTop(scrollRef);

  // const onPressFeeling = (feelingType) => {
  //   navigate('FeelingDetail', {
  //     feelingType,
  //     feelingName: findTargetFeelingObj(feelingType).text,
  //   });
  // };

  const onPressCategory = (categoryObj) => {
    push('DaplyListByCategory', {
      category: categoryObj.value,
      categoryName: categoryObj.text,
    });
  };

  const onPressProfile = (user) => {
    push('User', {
      userId: user.userId,
      nickname: user.nickname,
    });
  };

  const onPressDate = (date) => {
    push('DateDetail', {
      dateId: date.id,
    });
  };

  const onPressTheme = (subGroup) => {
    dispatch(homeActions.setDateTheme(subGroup.id));
    dispatch(homeActions.getDateByThemeAction(subGroup.id));
  };

  const onPressFeeling = (feeling) => {
    dispatch(homeActions.setDateFeeling(feeling));
    dispatch(homeActions.getDateByFeelingAction(feeling));
  };

  return (
    <View>
      <HeaderTitleWrapper>
        <TitleLogo></TitleLogo>
        <View center row>
          <Touchable
            style={{ marginRight: 10 }}
            onPress={() => push('Favorite')}
          >
            <AntDesign
              name="star"
              size={24}
              color={Colors.yellow40}
            ></AntDesign>
          </Touchable>
          <Touchable style={{ marginRight: 10 }} onPress={() => push('Search')}>
            <AntDesign name="search1" size={24}></AntDesign>
          </Touchable>
          <Touchable onPress={() => push('Noti')}>
            {mainBellActive && <BellActiveDot></BellActiveDot>}
            <SimpleIcon name="bell" size={24}></SimpleIcon>
          </Touchable>
        </View>
      </HeaderTitleWrapper>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: tabBarHeight + hp('3%') }}
        refreshControl={
          <RefreshControl
            refreshing={dateTopLoading || daplyTopLoading}
            onRefresh={onRefresh}
            tintColor={Colors.grey40}
          />
        }
      >
        <View paddingT-10 paddingH-10>
          <DaplyTop
            dateTopList={dateTopList}
            dateTopLoading={dateTopLoading}
            daplyTopLoading={daplyTopLoading}
            daplyTopList={daplyTopList}
            onPressCategory={onPressCategory}
            onPressProfile={onPressProfile}
            onPressDate={onPressDate}
          ></DaplyTop>
        </View>
        <View paddingT-10 paddingH-10>
          <DateTheme
            activeDateTheme={activeDateTheme}
            dateTopThemeList={dateTopThemeList}
            dateListByTheme={dateListByTheme}
            onPressTheme={onPressTheme}
            onPressDate={onPressDate}
            dateListByThemeLoading={dateListByThemeLoading}
          ></DateTheme>
        </View>
        <View paddingT-10 paddingH-10>
          <FeelingTop
            activeDateFeeling={activeDateFeeling}
            onPressDate={onPressDate}
            onPressFeeling={onPressFeeling}
            dateListByFeeling={dateListByFeeling}
            dateListByFeelingLoading={dateListByFeelingLoading}
          ></FeelingTop>
        </View>
        {/* <DateTop dateTopList={dateTopList}></DateTop> */}
      </ScrollView>
      {/* <Button
        label="데이트"
        onPress={() => navigate('DateDetail', { dateId: 6 })}
      ></Button> */}
    </View>
  );
};

export default HomeScreen;
