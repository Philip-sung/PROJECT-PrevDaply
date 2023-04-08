import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Keyboard,
  Linking,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  Incubator,
  ListItem,
  Colors,
  Button,
  TabBar,
} from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { MainWrapper, Wrapper } from '../../../styles/main';
import { useDebounce } from '../../../hooks/utils/search';
import { userActions } from '../../../redux/user';
import { colorTheme, hp } from '../../../styles';
import { setItemToAsync } from '../../../hooks/requests';
import { dateActions } from '../../../redux/date';
import checkCircleIcon from '../../../assets/icons/basic-circle-check-outline.png';
import checkedCircleIcon from '../../../assets/icons/basic-circle-check.png';
import { ListHeader } from '..';

const { TextField } = Incubator;

const ContactScreen = ({ navigation }) => {
  const { navigate } = navigation;
  const [searchValue, setSearchValue] = useState('');
  const keyboardRef = useRef(null);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const { contactList, contactAuthorized } = userState;

  useEffect(() => {
    dispatch(userActions.getAllContacts());
  }, []);

  useLayoutEffect(() => {
    const selected = contactList.filter((x) => x.selected).length > 0;
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Button
            onPress={onPressNext}
            link
            label={selected ? '다음' : '건너뛰기'}
          />
        </View>
      ),
    });
  }, [navigation, contactList]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => <Button link label="다음" marginR-10></Button>,
  //   });
  // }, [navigation]);

  const onSearch = (text) => {
    setSearchValue(text);
    dispatch(userActions.searchContacts(text));
  };

  const navigateToAppSetting = async () => {
    Linking.openSettings();
    await setItemToAsync('from', 'Post');
  };

  const onPressContact = (item) => {
    dispatch(userActions.selectContact(item));

    // const postingDate = {
    //   contact: item,
    // };
    // dispatch(dateActions.setPostingDate(postingDate));
    // navigate('KakaoLocSearch', postingDate);
  };

  const onPressNext = () => {
    const contactListSelected = contactList.filter((x) => x.selected);
    const params = { contactList: contactListSelected };
    dispatch(dateActions.setPostingDate(params));
    navigate('KakaoLocSearch', params);
  };

  const renderItem = ({ item }) => {
    if (item.id === -1 && !contactAuthorized) {
      return (
        <View center>
          <View style={{ marginTop: hp('20%') }}>
            <Button
              onPress={navigateToAppSetting}
              label="전화번호부 연동하기"
            ></Button>
          </View>
        </View>
      );
    }

    if (item.id === -1 && contactAuthorized) {
      return (
        <View center backgroundColor="white">
          <TextField
            ref={keyboardRef}
            autoFocus
            width="100%"
            showCharCounter
            onChangeText={onSearch}
            placeholder="ex.) 이름 검색"
          ></TextField>
        </View>
      );
    }

    return (
      <Animatable.View>
        <ListItem height={77.5} onPress={() => onPressContact(item)}>
          <ListItem.Part
            row
            containerStyle={[styles.border, { marginBottom: 3, width: '100%' }]}
          >
            <ListItem.Part column left>
              <View row>
                <Text numberOfLines={1}>{item.fullName}</Text>
                {item.following && (
                  <View
                    center
                    marginL-10
                    paddingH-3
                    style={{
                      borderColor: colorTheme.secondary[300],
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <Text text90L secondary>
                      팔로우중
                    </Text>
                  </View>
                )}
              </View>
              <Text grey40 style={{ marginTop: 2 }}>
                {item.phone}
              </Text>
            </ListItem.Part>
            <TouchableOpacity></TouchableOpacity>
            <ListItem.Part right>
              <FastImage
                style={{ width: 25, height: 25 }}
                source={!item.selected ? checkCircleIcon : checkedCircleIcon}
                resizeMode={FastImage.resizeMode.contain}
              ></FastImage>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  };

  return (
    <Wrapper>
      <FlatList
        onScrollBeginDrag={() => Keyboard.dismiss()}
        ListHeaderComponent={
          <ListHeader
            title="Step 01"
            subTitle="어느 분과 다녀오셨나요?"
          ></ListHeader>
        }
        keyboardShouldPersistTaps="handled"
        // ListFooterComponent={ListFooter}
        renderItem={renderItem}
        data={contactList}
        // keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        keyExtractor={(item) => item.id}
        // getTextInputLefs={() => [keyboardRef.current]}
      ></FlatList>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark70,
  },
});

export default ContactScreen;
