import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Keyboard } from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  View,
  Text,
  TextField,
  AnimatableManager,
  ListItem,
  Colors,
} from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper } from '../../../styles/main';
import { useDebounce } from '../../../hooks/utils/search';
import { kakaoActions } from '../../../redux/kakao';
import { dateActions } from '../../../redux/date';
import { parseCategory } from '../../../redux/date/utils';
import { ListHeader } from '..';
import { LocationLoader } from '../../../components/Loader';

const KakaoLocationScreen = ({ navigation }) => {
  const { navigate } = navigation;
  // const { params } = route;
  // const { contactList } = params;
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchTerm = useDebounce(searchValue, 100);
  const dispatch = useDispatch();
  const kakaoState = useSelector((state) => state.kakao);
  const dateState = useSelector((state) => state.date);
  const { locationList } = kakaoState;
  const { groupList, groupLoading } = dateState;

  useEffect(() => {
    dispatch(dateActions.getGroupList());
  }, []);

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    dispatch(kakaoActions.searchLocAction(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  const onSearch = (text) => {
    setSearchValue(text);
  };

  const onPressLoc = (loc) => {
    const targetGroup = parseCategory({ location: loc, groupList });
    // update date state
    dispatch(
      dateActions.setPostingDate({
        group: targetGroup,
      }),
    );
    // navigate
    navigate('Intro', { group: targetGroup, location: loc });
  };

  const renderItem = ({ item }) => {
    if (item.id === -1) {
      return (
        <View backgroundColor="white">
          <TextField
            autoFocus
            onChangeText={onSearch}
            placeholder="ex.) 경복궁"
          ></TextField>
        </View>
      );
    }
    return (
      <Animatable.View>
        <ListItem
          activeOpacity={0.3}
          height={77.5}
          onPress={() => onPressLoc(item)}
        >
          <ListItem.Part
            row
            containerStyle={[styles.border, { marginBottom: 3, width: '100%' }]}
          >
            <ListItem.Part column left>
              <Text dark10 text70 numberOfLines={1}>
                {item.place_name}
              </Text>
              <Text dark30 text70 style={{ marginTop: 2 }}>
                {item.road_address_name}
              </Text>
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  };

  return (
    <Wrapper>
      {groupLoading ? (
        <LocationLoader></LocationLoader>
      ) : (
        <FlatList
          onScrollBeginDrag={() => Keyboard.dismiss()}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <ListHeader
              title="Step 01"
              subTitle="어디 다녀오셨어요?"
            ></ListHeader>
          }
          renderItem={renderItem}
          data={locationList}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          keyExtractor={(item) => item.id}
        ></FlatList>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark70,
  },
});

export default KakaoLocationScreen;
