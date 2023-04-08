import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActionSheet,
  Colors,
} from 'react-native-ui-lib';
import { TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCicon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import HomeStack from './homeStack';
import ProfileStack from './profileStack';
import FeedStack from './feedStack';
import CategoryStack from './categoryStack';
import { bottomTabHeight, hp, shadowConfig } from '../../styles';
import * as RootNavigation from '../navigation';
export const Empty = () => <View></View>;

export const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation, handlePostAction }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: bottomTabHeight,
        position: 'relative',
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const isAdd = route.name === 'Add';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const renderIcon = () => {
          let iconName;
          const color = isFocused ? Colors.point : '#222';
          if (route.name === 'HomeStack') {
            iconName = isFocused ? 'ios-home' : 'ios-home-outline';
          }

          if (route.name === 'CategoryStack') {
            iconName = isFocused ? 'view-dashboard' : 'view-dashboard-outline';
            return <MCicon name={iconName} size={25} color={color} />;
          }

          if (route.name === 'Add') {
            return (
              <TouchableOpacity
                onPress={handlePostAction}
                backgroundColor={Colors.point}
                style={{
                  position: 'absolute',
                  bottom: hp('2%'), // space from bottombar
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...shadowConfig,
                }}
              >
                <MaIcon name="add" size={40} color="white"></MaIcon>
              </TouchableOpacity>
            );
          }

          if (route.name === 'FeedStack') {
            iconName = isFocused ? 'image' : 'image-outline';
            return <Ionicons name={iconName} size={25} color={color} />;
          }

          if (route.name === 'ProfileStack') {
            iconName = isFocused ? 'ios-person' : 'ios-person-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={25} color={color} />;
        };

        return (
          <TouchableWithoutFeedback
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={isAdd ? () => {} : onPress}
            onLongPress={isAdd ? () => {} : onLongPress}
          >
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {renderIcon()}
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

export default function MainTab() {
  const dateState = useSelector((state) => state.date);
  const { myDateList } = dateState;
  const [postActionVisible, setPostVisible] = useState(false);
  const hasDateList = myDateList.length > 0;

  const postOption = [
    { key: 'date', label: '데이트', onPress: () => navigateToPost() },
    {
      key: 'daply',
      label: '플레이리스트',
      onPress: () => navigateToDaplyInit(),
    },
    { key: 'cancel', label: '취소', onPress: () => {} },
  ];

  const filteredPostOption = hasDateList
    ? postOption
    : postOption.filter((x) => x.key !== 'daply');

  const handlePostAction = () => {
    setPostVisible(true);
  };

  const navigateToPost = () => {
    RootNavigation.navigate('Post');
  };

  const navigateToDaplyInit = () => {
    RootNavigation.navigate('DaplyPostStack');
  };

  return (
    <>
      <ActionSheet
        title="포스팅"
        message="포스팅 종류를 선택하세요"
        cancelButtonIndex={hasDateList ? 2 : 1}
        // destructiveButtonIndex={hasDateList ? 2 : 1}
        useNativeIOS
        options={filteredPostOption}
        visible={postActionVisible}
        onDismiss={() => setPostVisible(false)}
      />
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => (
          <MyTabBar {...props} handlePostAction={handlePostAction}></MyTabBar>
        )}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="FeedStack" component={FeedStack} />
        <Tab.Screen name="Add" component={Empty} />
        <Tab.Screen name="CategoryStack" component={CategoryStack} />
        <Tab.Screen name="ProfileStack" component={ProfileStack} />
      </Tab.Navigator>
    </>
  );
}
