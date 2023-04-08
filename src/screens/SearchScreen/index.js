import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { Text, View, Colors } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import { searchActions } from '../../redux/search';
import {
  colorTheme,
  hp,
  ListImageWidth,
  mainPaddingVertical,
  paddingHorizontal,
  Touchable,
  wp,
} from '../../styles';
import { SearchBar } from './SearchBar';
import DateItem from '../../components/DateItem';
import { DateLoader } from '../../components/Loader';
import UserListItem from '../../components/UserListItem';
import UserListItemBig from '../../components/UserListItemBig';

const SearchScreen = ({ navigation, route }) => {
  const { navigate, pop, push } = navigation;
  const { params } = route;
  const [isFocused, setFocused] = useState(false);
  const [query, setQuery] = useState(params?.title || '');
  const dispatch = useDispatch();
  const searchInputWidth = useSharedValue(wp('75%'));
  const keyboardRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { collectionList, collectionLoading, searchLoading, searchResult } =
    useSelector((state) => state.search);

  useFocusEffect(
    useCallback(() => {
      dispatch(searchActions.getCollection(''));
      setFocused(false);
      if (params) {
        dispatch(searchActions.getSearch(params.title));
      }
    }, []),
  );

  const searchInput = {
    value: query,
    placeholder: '검색하세요',
    placeholderTextColor: Colors.grey40,
    autoFocus: false,
    onFocus: () => {
      setFocused(true);
    },
    onBlur: () => {},
    onChangeText: (txt) => {
      dispatch(searchActions.getCollection(txt));
      setQuery(txt);
    },
    onSubmitEditing: () => {
      onSearch();
    },
    ref: keyboardRef,
    style: {
      width: wp('70%'),
      fontSize: 18,
      // borderColor: 'red',
      // borderWidth: 1,
    },
  };

  const onCancel = () => {
    setFocused(false);
  };

  const onPressUser = (_user) => {
    push('User', {
      userId: _user.userId,
      nickname: _user.nickname,
      from: 'Search',
    });
  };

  const onSearch = (pressValue) => {
    if (!pressValue && query.length > 1) {
      push('Search', { title: query });
    }
    if (pressValue) {
      push('Search', { title: pressValue });
    }
    setFocused(false);
  };

  const renderCollection = ({ item }) => {
    const isMine = item.userId === user.id;
    const { isUser } = item;
    if (isUser)
      return (
        <UserListItem user={item} onPressUser={onPressUser}></UserListItem>
      );
    return (
      <Touchable
        onPress={() => onSearch(item.word)}
        style={{ paddingHorizontal }}
      >
        <View paddingV-10 row centerV>
          <View
            center
            style={{
              width: ListImageWidth,
              height: ListImageWidth,
              borderRadius: ListImageWidth / 2,
            }}
            marginR-15
          >
            {isMine ? (
              <Entypo
                size={24}
                name="back-in-time"
                color={Colors.grey30}
              ></Entypo>
            ) : (
              <AntDesign
                color={Colors.grey30}
                name="search1"
                size={24}
              ></AntDesign>
            )}
          </View>
          <Text>{item.word}</Text>
        </View>
      </Touchable>
    );
  };

  const onPressItem = (item) => {
    navigate('DateDetail', { dateId: item.id });
  };

  const renderItem = ({ item, index }) => {
    const { isUser } = item;
    if (isUser)
      return (
        <UserListItemBig
          user={item}
          onPressUser={onPressUser}
        ></UserListItemBig>
      );
    return (
      <DateItem
        onPress={() => onPressItem(item)}
        index={index}
        title={item.title}
        mainImg={item.mainImg}
        subGroup={{ name: item.groupName }}
        location={{
          addressName: item.addressName,
        }}
      ></DateItem>
    );
  };

  const renderContent = () => {
    if (searchLoading) {
      return <DateLoader wrapperHeight={55}></DateLoader>;
    }

    if (!isFocused && params?.title) {
      return (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal,
            paddingVertical: mainPaddingVertical,
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="onDrag"
          // ListFooterComponent={ListFooter}
          renderItem={renderItem}
          data={searchResult}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          // getTextInputLefs={() => [keyboardRef.current]}
        ></FlatList>
      );
    }
    return (
      <FlatList
        contentContainerStyle={{
          paddingVertical: mainPaddingVertical,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="onDrag"
        // ListFooterComponent={ListFooter}
        renderItem={renderCollection}
        data={collectionList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        // getTextInputLefs={() => [keyboardRef.current]}
      ></FlatList>
    );
  };

  return (
    <SafeAreaView>
      <SearchBar
        collectionLoading={collectionLoading}
        isFocused={isFocused}
        searchInput={searchInput}
        searchInputWidth={searchInputWidth}
        onPressBack={() => pop()}
        onCancel={onCancel}
      ></SearchBar>
      {renderContent()}
    </SafeAreaView>
  );
};

export default SearchScreen;
